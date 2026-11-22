import { AxiosHeaders, type InternalAxiosRequestConfig } from 'axios'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { LocalStorageAdapter } from '@/core/infra/cache'

import { authInterceptorRequest } from './auth-interceptor'

function makeConfig(): InternalAxiosRequestConfig {
  return { headers: new AxiosHeaders() }
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('authInterceptorRequest', () => {
  it('envia o access token salvo como Bearer no Authorization', async () => {
    const get = vi.spyOn(LocalStorageAdapter, 'get').mockReturnValue('abc')

    const config = await authInterceptorRequest(makeConfig())

    expect(get).toHaveBeenCalledWith(
      LocalStorageAdapter.LOCAL_STORAGE_KEYS.AUTH
    )
    expect(config.headers.Authorization).toBe('Bearer abc')
  })

  it('não define Authorization quando não há token salvo', async () => {
    vi.spyOn(LocalStorageAdapter, 'get').mockReturnValue(null)

    const config = await authInterceptorRequest(makeConfig())

    expect(config.headers.Authorization).toBeUndefined()
  })
})
