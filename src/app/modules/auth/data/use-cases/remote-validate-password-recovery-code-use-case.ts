import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import { NotFoundError, UnexpectedError } from '@/core/domain/errors'

import type { ValidatePasswordRecoveryCodeUseCase } from '../../domain/use-cases'

type ApiErrorBody = { message?: string }

export class RemoteValidatePasswordRecoveryCodeUseCase
  implements ValidatePasswordRecoveryCodeUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<void>
  ) {}

  execute: ValidatePasswordRecoveryCodeUseCase['execute'] = async (params) => {
    const { statusCode, body } = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: { email: params.email, code: params.recoveryCode },
    })

    if (statusCode === HttpStatusCode.ok) return

    const apiMessage = (body as ApiErrorBody | undefined)?.message

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError(apiMessage ?? 'Código de recuperação inválido')
    }

    throw new UnexpectedError(apiMessage)
  }
}
