import axios, {
  AxiosError,
  AxiosHeaders,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  type MockInstance,
  vi,
} from 'vitest'

import { LocalStorageAdapter } from '@/core/infra/cache'

import { createAuthRefreshInterceptor } from './auth-refresh-interceptor'

const { AUTH, REFRESH_TOKEN } = LocalStorageAdapter.LOCAL_STORAGE_KEYS

type RetryableConfig = InternalAxiosRequestConfig & { retry?: boolean }

function makeConfig(url = 'v1/properties'): RetryableConfig {
  return { url, headers: new AxiosHeaders() }
}

function makeAxiosError(status: number, config?: RetryableConfig) {
  const response = { status, data: {}, config } as AxiosResponse
  return new AxiosError(
    `HTTP ${status}`,
    'ERR_BAD_REQUEST',
    config,
    null,
    response
  )
}

function deferred<T>() {
  let resolve!: (value: T) => void
  let reject!: (reason: unknown) => void
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

let storage: Map<string, string>
let logoutEvents: number
let api: ReturnType<typeof vi.fn> & AxiosInstance
let post: MockInstance<typeof axios.post>

beforeEach(() => {
  storage = new Map([
    [AUTH, 'access-antigo'],
    [REFRESH_TOKEN, 'refresh-antigo'],
  ])
  vi.spyOn(LocalStorageAdapter, 'get').mockImplementation(
    (key) => storage.get(key) ?? null
  )
  vi.spyOn(LocalStorageAdapter, 'set').mockImplementation((key, value) => {
    if (value) storage.set(key, String(value))
    else storage.delete(key)
  })

  logoutEvents = 0
  const fakeWindow = new EventTarget()
  fakeWindow.addEventListener('auth:token-expired', () => {
    logoutEvents += 1
  })
  vi.stubGlobal('window', fakeWindow)

  api = Object.assign(
    vi.fn(async (config: InternalAxiosRequestConfig) => ({
      status: 200,
      data: 'ok',
      config,
    })),
    { defaults: { baseURL: '/api' } }
  ) as unknown as typeof api

  post = vi.spyOn(axios, 'post').mockResolvedValue({
    data: { accessToken: 'access-novo', refreshToken: 'refresh-novo' },
  })
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('createAuthRefreshInterceptor', () => {
  it('repassa erros que não são do axios', async () => {
    const interceptor = createAuthRefreshInterceptor(api)
    const error = new Error('boom')

    await expect(interceptor(error)).rejects.toBe(error)
    expect(post).not.toHaveBeenCalled()
  })

  it('repassa erros do axios sem config', async () => {
    const interceptor = createAuthRefreshInterceptor(api)
    const error = makeAxiosError(401)

    await expect(interceptor(error)).rejects.toBe(error)
    expect(post).not.toHaveBeenCalled()
  })

  it.each([400, 403, 404, 500])(
    'repassa o status %i sem tentar renovar o token',
    async (status) => {
      const interceptor = createAuthRefreshInterceptor(api)
      const error = makeAxiosError(status, makeConfig())

      await expect(interceptor(error)).rejects.toBe(error)
      expect(post).not.toHaveBeenCalled()
      expect(logoutEvents).toBe(0)
    }
  )

  it('não renova de novo uma requisição que já foi repetida', async () => {
    const interceptor = createAuthRefreshInterceptor(api)
    const config = { ...makeConfig(), retry: true }
    const error = makeAxiosError(401, config)

    await expect(interceptor(error)).rejects.toBe(error)
    expect(post).not.toHaveBeenCalled()
  })

  it('no 401 sem refresh token, limpa os tokens e avisa o logout', async () => {
    storage.delete(REFRESH_TOKEN)
    const interceptor = createAuthRefreshInterceptor(api)
    const error = makeAxiosError(401, makeConfig())

    await expect(interceptor(error)).rejects.toBe(error)
    expect(post).not.toHaveBeenCalled()
    expect(storage.has(AUTH)).toBe(false)
    expect(logoutEvents).toBe(1)
  })

  it('no 401, renova os tokens e repete a requisição com o novo Bearer', async () => {
    const interceptor = createAuthRefreshInterceptor(api)
    const config = makeConfig()

    const response = await interceptor(makeAxiosError(401, config))

    expect(post).toHaveBeenCalledTimes(1)
    expect(post).toHaveBeenCalledWith(
      'v1/auth/refresh',
      { token: 'refresh-antigo' },
      expect.objectContaining({ baseURL: '/api' })
    )
    expect(storage.get(AUTH)).toBe('access-novo')
    expect(storage.get(REFRESH_TOKEN)).toBe('refresh-novo')
    expect(api).toHaveBeenCalledTimes(1)
    expect(api).toHaveBeenCalledWith(config)
    expect(config.retry).toBe(true)
    expect(config.headers.Authorization).toBe('Bearer access-novo')
    expect(response).toMatchObject({ status: 200, data: 'ok' })
    expect(logoutEvents).toBe(0)
  })

  it('se a renovação falha, limpa os tokens, avisa o logout e repassa o 401', async () => {
    post.mockRejectedValue(makeAxiosError(401, makeConfig('v1/auth/refresh')))
    const interceptor = createAuthRefreshInterceptor(api)
    const error = makeAxiosError(401, makeConfig())

    await expect(interceptor(error)).rejects.toBe(error)
    expect(storage.has(AUTH)).toBe(false)
    expect(storage.has(REFRESH_TOKEN)).toBe(false)
    expect(api).not.toHaveBeenCalled()
    expect(logoutEvents).toBe(1)
  })

  it('com 401 simultâneos, renova uma vez e repete todas as requisições', async () => {
    const refresh = deferred<unknown>()
    post.mockReturnValue(refresh.promise)
    const interceptor = createAuthRefreshInterceptor(api)
    const first = makeConfig('v1/a')
    const second = makeConfig('v1/b')

    const firstResult = interceptor(makeAxiosError(401, first))
    const secondResult = interceptor(makeAxiosError(401, second))
    refresh.resolve({
      data: { accessToken: 'access-novo', refreshToken: 'refresh-novo' },
    })

    await expect(firstResult).resolves.toMatchObject({ status: 200 })
    await expect(secondResult).resolves.toMatchObject({ status: 200 })
    expect(post).toHaveBeenCalledTimes(1)
    expect(api).toHaveBeenCalledTimes(2)
    expect(first.headers.Authorization).toBe('Bearer access-novo')
    expect(second.headers.Authorization).toBe('Bearer access-novo')
  })

  it('com 401 simultâneos e renovação falha, rejeita todas e avisa o logout uma vez', async () => {
    const refresh = deferred<unknown>()
    post.mockReturnValue(refresh.promise)
    const interceptor = createAuthRefreshInterceptor(api)
    const firstError = makeAxiosError(401, makeConfig('v1/a'))
    const secondError = makeAxiosError(401, makeConfig('v1/b'))

    const firstResult = interceptor(firstError)
    const secondResult = interceptor(secondError)
    refresh.reject(new Error('refresh expirado'))

    await expect(firstResult).rejects.toBe(firstError)
    await expect(secondResult).rejects.toBe(secondError)
    expect(api).not.toHaveBeenCalled()
    expect(logoutEvents).toBe(1)
  })

  // Bug: `return await api(originalRequest)` fica dentro do `try`. Se a
  // renovação dá certo mas a requisição repetida falha (500, 422, 403...),
  // o `catch` trata como falha de renovação: apaga os tokens recém-obtidos,
  // dispara o logout e repassa o 401 original em vez do erro real.
  it.fails(
    'quando a requisição repetida falha, repassa o erro dela e mantém a sessão',
    async () => {
      const retryError = makeAxiosError(500, makeConfig())
      api.mockRejectedValue(retryError)
      const interceptor = createAuthRefreshInterceptor(api)

      await expect(interceptor(makeAxiosError(401, makeConfig()))).rejects.toBe(
        retryError
      )
      expect(storage.get(AUTH)).toBe('access-novo')
      expect(logoutEvents).toBe(0)
    }
  )

  // A API real (Spring Security sem AuthenticationEntryPoint configurado)
  // responde 403, não 401, a JWT ausente/expirado/inválido; o interceptor só
  // renova no 401. O mock (`withAuth`) devolve 401 e esconde a diferença.
  it.todo(
    'renova o token quando a API sinaliza JWT expirado (hoje a API real responde 403)'
  )
})
