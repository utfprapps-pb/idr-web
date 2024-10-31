import { type IHttpClient, HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'

import type { ILogin } from '@/domain/useCases/auth'

export class RemoteLogin implements ILogin {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpClient
  ) {}

  execute: ILogin['execute'] = async (params) => {
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
