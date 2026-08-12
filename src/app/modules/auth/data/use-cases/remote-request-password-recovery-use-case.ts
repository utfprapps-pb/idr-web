import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import { UnexpectedError } from '@/core/domain/errors'

import type { RequestPasswordRecoveryUseCase } from '../../domain/use-cases'

export class RemoteRequestPasswordRecoveryUseCase
  implements RequestPasswordRecoveryUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<void>
  ) {}

  execute: RequestPasswordRecoveryUseCase['execute'] = async (params) => {
    const { statusCode, body } = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: { email: params.email },
    })

    if (statusCode === HttpStatusCode.ok) return

    const apiMessage = (body as { message?: string } | undefined)?.message
    throw new UnexpectedError(apiMessage)
  }
}
