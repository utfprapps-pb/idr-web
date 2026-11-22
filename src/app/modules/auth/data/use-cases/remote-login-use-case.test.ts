import { describe, expect, it } from 'vitest'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { HttpClientSpy } from '@/core/data/test/http-client-spy'
import {
  ForbiddenError,
  InvalidCredentialsError,
  UnexpectedError,
} from '@/core/domain/errors'

import { RemoteLoginUseCase } from './remote-login-use-case'

import type { AuthApiResponse, AuthModel } from '../../domain/models/auth-model'
import type { HttpResponse } from '@/core/data/protocols/http'

const URL = 'login'

const CREDENTIALS = { email: 'tecnico@idr.pr.gov.br', password: 'segredo123' }

function makeSut(response: HttpResponse<AuthApiResponse>) {
  const httpClientSpy = new HttpClientSpy<AuthModel, AuthApiResponse>()
  httpClientSpy.response = response
  const sut = new RemoteLoginUseCase(URL, httpClientSpy)

  return { sut, httpClientSpy }
}

describe('RemoteLoginUseCase', () => {
  it('envia POST para a URL com e-mail como username e a senha', async () => {
    const { sut, httpClientSpy } = makeSut({
      statusCode: HttpStatusCode.ok,
      body: { accessToken: 'access', refreshToken: 'refresh' },
    })

    await sut.execute(CREDENTIALS)

    expect(httpClientSpy.requests).toHaveLength(1)
    expect(httpClientSpy.lastRequest).toEqual({
      url: URL,
      method: 'post',
      body: { username: CREDENTIALS.email, password: CREDENTIALS.password },
    })
  })

  it('devolve o access token e o refresh token da resposta 200', async () => {
    const { sut } = makeSut({
      statusCode: HttpStatusCode.ok,
      // campos extras da API não vazam para o modelo
      body: {
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        user: { displayName: 'Fulano' },
      } as AuthApiResponse,
    })

    await expect(sut.execute(CREDENTIALS)).resolves.toEqual({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    })
  })

  it('lança InvalidCredentialsError no 401', async () => {
    const { sut } = makeSut({ statusCode: HttpStatusCode.unauthorized })

    await expect(sut.execute(CREDENTIALS)).rejects.toBeInstanceOf(
      InvalidCredentialsError
    )
  })

  it('lança ForbiddenError com o detail da API no 403 (cadastro inativo)', async () => {
    const { sut } = makeSut({
      statusCode: HttpStatusCode.forbidden,
      body: {
        type: 'urn:idr:problem:cadastro-inativo',
        title: 'Cadastro inativo',
        detail: 'Seu cadastro está inativo',
      } as never,
    })

    const error = await sut.execute(CREDENTIALS).catch((e: unknown) => e)

    expect(error).toBeInstanceOf(ForbiddenError)
    expect((error as Error).message).toBe('Seu cadastro está inativo')
  })

  it('lança ForbiddenError com a mensagem padrão no 403 sem corpo', async () => {
    const { sut } = makeSut({ statusCode: HttpStatusCode.forbidden })

    await expect(sut.execute(CREDENTIALS)).rejects.toThrow(
      new ForbiddenError().message
    )
  })

  it('lança UnexpectedError no 200 sem corpo', async () => {
    const { sut } = makeSut({ statusCode: HttpStatusCode.ok })

    await expect(sut.execute(CREDENTIALS)).rejects.toBeInstanceOf(
      UnexpectedError
    )
  })

  it('ignora o corpo antigo { message } (sem transição)', async () => {
    const { sut } = makeSut({
      statusCode: HttpStatusCode.forbidden,
      body: { message: 'formato antigo' } as never,
    })

    await expect(sut.execute(CREDENTIALS)).rejects.toThrow(
      new ForbiddenError().message
    )
  })

  it('lança UnexpectedError com o detail da API em outros status', async () => {
    const { sut } = makeSut({
      statusCode: HttpStatusCode.serverError,
      body: {
        type: 'urn:idr:problem:erro-interno',
        title: 'Erro interno',
        detail: 'Falha interna',
      } as never,
    })

    const error = await sut.execute(CREDENTIALS).catch((e: unknown) => e)

    expect(error).toBeInstanceOf(UnexpectedError)
    expect((error as Error).message).toBe('Falha interna')
  })
})
