import { describe, expect, it } from 'vitest'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { HttpClientSpy } from '@/core/data/test/http-client-spy'
import { UnexpectedError } from '@/core/domain/errors'

import { RemoteRequestPasswordRecoveryUseCase } from './remote-request-password-recovery-use-case'

describe('RemoteRequestPasswordRecoveryUseCase — erros no formato Problem Details', () => {
  it('400 usa o detail da API', async () => {
    const httpClient = new HttpClientSpy<void>()
    httpClient.response = {
      statusCode: HttpStatusCode.badRequest,
      body: {
        type: 'urn:idr:problem:validacao',
        title: 'Erro de validação',
        detail: 'Usuário não encontrado',
      } as never,
    }
    const sut = new RemoteRequestPasswordRecoveryUseCase(
      '/v1/email/send-recuperation-code',
      httpClient
    )

    await expect(sut.execute({ email: 'x@idr.com' })).rejects.toEqual(
      new UnexpectedError('Usuário não encontrado')
    )
  })
})
