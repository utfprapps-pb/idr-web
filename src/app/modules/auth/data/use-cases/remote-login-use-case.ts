import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  ForbiddenError,
  InvalidCredentialsError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { AuthApiResponse, AuthModel } from '../../domain/models/auth-model'
import type { LoginUseCase } from '../../domain/use-cases'

type ApiErrorBody = { message?: string }

export class RemoteLoginUseCase implements LoginUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<AuthModel, AuthApiResponse>
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

    if (statusCode === HttpStatusCode.forbidden) {
      const apiMessage = (body as ApiErrorBody | undefined)?.message
      throw new ForbiddenError(apiMessage)
    }

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        accessToken: body.accessToken,
        refreshToken: body.refreshToken,
      }
    }

    const apiMessage = (body as ApiErrorBody | undefined)?.message
    throw new UnexpectedError(apiMessage)
  }
}
