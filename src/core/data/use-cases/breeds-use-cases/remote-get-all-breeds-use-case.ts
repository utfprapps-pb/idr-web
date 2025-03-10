import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { GetAllBreedsUseCase } from '@/core/domain/use-cases/breeds-use-cases'

export class RemoteGetAllBreedsUseCase implements GetAllBreedsUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: GetAllBreedsUseCase['execute'] = async (search) => {
    const { statusCode, body } = await this.httpClient.request({
      url: this.url,
      method: 'get',
      filters: {
        name: search,
      },
    })

    if (statusCode === HttpStatusCode.ok) {
      return body.map((item: { id: string; name: string }) => ({
        value: item.id,
        label: item.name,
      }))
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError()
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Raças')
    }

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    throw new UnexpectedError()
  }
}
