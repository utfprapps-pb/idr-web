import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios'

import { LocalStorageAdapter } from '@/core/infra/cache'

function clearTokensAndNotify() {
  LocalStorageAdapter.set(LocalStorageAdapter.LOCAL_STORAGE_KEYS.AUTH)
  LocalStorageAdapter.set(LocalStorageAdapter.LOCAL_STORAGE_KEYS.REFRESH_TOKEN)
  window.dispatchEvent(new Event('auth:token-expired'))
}

export function createAuthRefreshInterceptor(api: AxiosInstance) {
  return async function authRefreshInterceptorResponseError(error: unknown) {
    if (!axios.isAxiosError(error)) return Promise.reject(error)

    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { retry?: boolean })
      | undefined
    if (!originalRequest) return Promise.reject(error)

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest.retry
    ) {
      originalRequest.retry = true
      const refreshToken = LocalStorageAdapter.get(
        LocalStorageAdapter.LOCAL_STORAGE_KEYS.REFRESH_TOKEN
      )
      if (!refreshToken) {
        clearTokensAndNotify()
        return Promise.reject(error)
      }

      try {
        // Uses a plain axios call (not `api`) so this request bypasses
        // `api`'s response interceptor and never recurses into itself.
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
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
        return api(originalRequest)
      } catch {
        clearTokensAndNotify()
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
}
