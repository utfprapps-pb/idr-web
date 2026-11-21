import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import { BadRequestError, UnexpectedError } from '@/core/domain/errors'
import { getProblemDetailMessage } from '@/core/utils'

import type { ResetPasswordUseCase } from '../../domain/use-cases'

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

    const apiMessage = getProblemDetailMessage(body)

    if (statusCode === HttpStatusCode.badRequest) {
      throw new BadRequestError(apiMessage ?? 'Código de recuperação inválido')
    }

    throw new UnexpectedError(apiMessage)
  }
}
