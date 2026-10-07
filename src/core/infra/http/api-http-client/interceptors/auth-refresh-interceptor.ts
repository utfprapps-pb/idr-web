import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios'

import { LocalStorageAdapter } from '@/core/infra/cache'

type RetryableRequest = InternalAxiosRequestConfig & { retry?: boolean }

type QueuedRequest = {
  onRefreshed: (accessToken: string) => void
  onFailed: (error: unknown) => void
}

let isRefreshing = false
let refreshQueue: QueuedRequest[] = []

function flushQueue(error: unknown, accessToken: string | null) {
  const queue = refreshQueue
  refreshQueue = []
  queue.forEach(({ onRefreshed, onFailed }) => {
    if (accessToken) onRefreshed(accessToken)
    else onFailed(error)
  })
}

function clearTokensAndNotify() {
  LocalStorageAdapter.set(LocalStorageAdapter.LOCAL_STORAGE_KEYS.AUTH)
  LocalStorageAdapter.set(LocalStorageAdapter.LOCAL_STORAGE_KEYS.REFRESH_TOKEN)
  window.dispatchEvent(new Event('auth:token-expired'))
}

export function createAuthRefreshInterceptor(api: AxiosInstance) {
  async function refreshAccessToken(refreshToken: string): Promise<string> {
    const { data } = await axios.post<{
      accessToken: string
      refreshToken: string
    }>(
      'v1/auth/refresh',
      { token: refreshToken },
      {
        baseURL: api.defaults.baseURL,
        headers: { 'Content-Type': 'application/json' },
        timeout: 30 * 1000,
      }
    )

    LocalStorageAdapter.set(
      LocalStorageAdapter.LOCAL_STORAGE_KEYS.AUTH,
      data.accessToken
    )
    LocalStorageAdapter.set(
      LocalStorageAdapter.LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
      data.refreshToken
    )

    return data.accessToken
  }

  return async function authRefreshInterceptorResponseError(error: unknown) {
    if (!axios.isAxiosError(error)) throw error

    const originalRequest = error.config as RetryableRequest | undefined
    if (!originalRequest) throw error

    if (error.response?.status !== 401 || originalRequest.retry) {
      throw error
    }

    originalRequest.retry = true

    const refreshToken = LocalStorageAdapter.get(
      LocalStorageAdapter.LOCAL_STORAGE_KEYS.REFRESH_TOKEN
    )
    if (!refreshToken) {
      clearTokensAndNotify()
      throw error
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({
          onRefreshed: (accessToken) => {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`
            resolve(api(originalRequest))
          },
          onFailed: () => reject(error),
        })
      })
    }

    isRefreshing = true

    try {
      const accessToken = await refreshAccessToken(refreshToken)
      flushQueue(null, accessToken)
      originalRequest.headers.Authorization = `Bearer ${accessToken}`
      return await api(originalRequest)
    } catch (refreshError) {
      flushQueue(refreshError, null)
      clearTokensAndNotify()
      throw error
    } finally {
      isRefreshing = false
    }
  }
}
