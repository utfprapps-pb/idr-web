import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import { NotFoundError, UnexpectedError } from '@/core/domain/errors'

import type { ResetPasswordUseCase } from '../../domain/use-cases'

type ApiErrorBody = { message?: string }

export class RemoteResetPasswordUseCase implements ResetPasswordUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<void>
  ) {}

  execute: ResetPasswordUseCase['execute'] = async (params) => {
    const { statusCode, body } = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: {
        email: params.email,
        code: params.recoveryCode,
        password: params.newPassword,
        confirmPassword: params.confirmPassword,
      },
    })

    if (statusCode === HttpStatusCode.ok) return

    const apiMessage = (body as ApiErrorBody | undefined)?.message

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError(apiMessage ?? 'Código de recuperação inválido')
    }

    throw new UnexpectedError(apiMessage)
  }
}
