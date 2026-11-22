import { describe, expect, it } from 'vitest'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { HttpClientSpy } from '@/core/data/test/http-client-spy'
import { BadRequestError } from '@/core/domain/errors'

import { RemoteValidatePasswordRecoveryCodeUseCase } from './remote-validate-password-recovery-code-use-case'

const params = { email: 'x@idr.com', recoveryCode: '123456' }

function makeSut(body?: unknown) {
  const httpClient = new HttpClientSpy<void>()
  httpClient.response = {
    statusCode: HttpStatusCode.badRequest,
    body: body as never,
  }
  return new RemoteValidatePasswordRecoveryCodeUseCase(
    '/v1/email/validate-recuperation-code',
    httpClient
  )
}

describe('RemoteValidatePasswordRecoveryCodeUseCase — código de recuperação inválido (400)', () => {
  it('usa o detail da API', async () => {
    const sut = makeSut({
      type: 'urn:idr:problem:validacao',
      title: 'Erro de validação',
      detail: 'Código de recuperação expirado',
    })

    await expect(sut.execute(params)).rejects.toEqual(
      new BadRequestError('Código de recuperação expirado')
    )
  })

  it('sem corpo usa a mensagem padrão do código inválido', async () => {
    const sut = makeSut()

    await expect(sut.execute(params)).rejects.toEqual(
      new BadRequestError('Código de recuperação inválido')
    )
  })
})
