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

const INACTIVE =
  'Seu cadastro está inativo, solicite a um administrador para ativá-lo'

function makeSut(statusCode: HttpStatusCode, body?: unknown) {
  const httpClient = new HttpClientSpy<AuthModel, AuthApiResponse>()
  httpClient.response = { statusCode, body: body as AuthApiResponse }
  const sut = new RemoteLoginUseCase('/login', httpClient)
  return { sut, httpClient }
}

const params = { email: 'tecnico1@idr.com', password: 'Senha@123' }

describe('RemoteLoginUseCase — erros no formato Problem Details', () => {
  it('401 lança InvalidCredentialsError', async () => {
    const { sut } = makeSut(HttpStatusCode.unauthorized, {
      type: 'urn:idr:problem:credenciais-invalidas',
      title: 'Credenciais inválidas',
      detail: 'Usuário ou senha inválidos',
    })

    await expect(sut.execute(params)).rejects.toBeInstanceOf(
      InvalidCredentialsError
    )
  })

  it('403 de cadastro inativo usa o detail da API', async () => {
    const { sut } = makeSut(HttpStatusCode.forbidden, {
      type: 'urn:idr:problem:cadastro-inativo',
      title: 'Cadastro inativo',
      detail: INACTIVE,
    })

    await expect(sut.execute(params)).rejects.toEqual(
      new ForbiddenError(INACTIVE)
    )
  })

  it('403 sem corpo usa a mensagem padrão do ForbiddenError', async () => {
    const { sut } = makeSut(HttpStatusCode.forbidden)

    await expect(sut.execute(params)).rejects.toEqual(new ForbiddenError())
  })

  it('500 usa o detail da API', async () => {
    const { sut } = makeSut(HttpStatusCode.serverError, {
      title: 'Erro interno',
      detail: 'Erro inesperado, tente novamente mais tarde',
    })

    await expect(sut.execute(params)).rejects.toEqual(
      new UnexpectedError('Erro inesperado, tente novamente mais tarde')
    )
  })
})
