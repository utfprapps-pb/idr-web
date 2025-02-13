import { type IHttpClient, HttpStatusCode } from '@/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/domain/errors'

import type { IGetAllBreeds } from '@/domain/useCases/breed'

export class RemoteGetAllBreeds implements IGetAllBreeds {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpClient
  ) {}

  execute: IGetAllBreeds['execute'] = async (search) => {
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
