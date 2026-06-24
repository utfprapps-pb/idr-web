import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type {
  SearchProducersUseCase,
  SearchProducersResult,
} from '@/core/domain/use-cases/producers-use-cases'

type ProducerSearchApiResponse = {
  currentPage: number
  perPage: number
  total: number
  items: Array<{ id: string; name: string }>
}

export class RemoteSearchProducersUseCase implements SearchProducersUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      unknown,
      unknown,
      ProducerSearchApiResponse
    >
  ) {}

  execute: SearchProducersUseCase['execute'] = async ({
    terms = '',
    page = 0,
    perPage = 10,
  }) => {
    const params = new URLSearchParams({
      terms,
      page: String(page),
      perPage: String(perPage),
      sort: 'name',
      direction: 'asc',
    })

    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/search?${params.toString()}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        items: body.items.map((item) => ({ id: item.id, name: item.name })),
        total: body.total,
      } as SearchProducersResult
    }

    if (statusCode === HttpStatusCode.forbidden) throw new ForbiddenError()

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    throw new UnexpectedError()
  }
}
