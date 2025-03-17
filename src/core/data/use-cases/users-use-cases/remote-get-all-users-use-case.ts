import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { GetAllUsersUseCase } from '@/core/domain/use-cases/users-use-cases'

export class RemoteGetAllUsersUseCase implements GetAllUsersUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: GetAllUsersUseCase['execute'] = async (search) => {
    const { statusCode, body } = await this.httpClient.request({
      url: this.url,
      method: 'get',
      filters: {
        name: search,
      },
    })

    if (statusCode === HttpStatusCode.ok) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return body.map((item: any) => ({
        value: item.id,
        label: item.name,
      }))
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError()
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Usuários')
    }

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    throw new UnexpectedError()
  }
}
