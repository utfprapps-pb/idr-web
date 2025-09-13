import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'

import type {
  UserApiResponse,
  UserModel,
} from '@/core/domain/models/users-model'
import type { GetMeUseCase } from '@/core/domain/use-cases/users-use-cases'

export class RemoteGetMeUseCase implements GetMeUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<UserModel, UserApiResponse>
  ) {}

  execute: GetMeUseCase['execute'] = async () => {
    const { statusCode, body } = await this.httpClient.request({
      url: this.url,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && body) {
      return {
        id: body.id,
        name: body.displayName,
      }
    }

    if (statusCode === HttpStatusCode.forbidden) throw new ForbiddenError()

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Usuário')
    }

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    throw new UnexpectedError()
  }
}
