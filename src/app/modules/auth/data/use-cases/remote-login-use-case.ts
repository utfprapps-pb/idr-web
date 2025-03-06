import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/core/domain/errors'

import type { LoginUseCase } from '../../domain/use-cases'

export class RemoteLoginUseCase implements LoginUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: LoginUseCase['execute'] = async (params) => {
    const payload = {
      username: params.email,
      password: params.password,
    }

    const { statusCode, body } = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: payload,
    })

    if (statusCode === HttpStatusCode.unauthorized) {
      throw new InvalidCredentialsError()
    }

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        token: body.token,
      }
    }

    throw new UnexpectedError()
  }
}
