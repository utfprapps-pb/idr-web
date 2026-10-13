import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import { ForbiddenError, UnexpectedError } from '@/core/domain/errors'

import type {
  SearchRegionsUseCase,
  SearchRegionsResult,
} from '../../domain/use-cases'

type RegionSearchApiResponse = {
  currentPage: number
  perPage: number
  total: number
  items: Array<{ id: string; description: string }>
}

export class RemoteSearchRegionsUseCase implements SearchRegionsUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      unknown,
      unknown,
      RegionSearchApiResponse
    >
  ) {}

  execute: SearchRegionsUseCase['execute'] = async ({
    terms = '',
    page = 0,
    perPage = 10,
  }) => {
    const params = new URLSearchParams({
      terms,
      page: String(page),
      perPage: String(perPage),
      sort: 'description',
      direction: 'asc',
    })

    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/search?${params.toString()}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        items: body.items.map((item) => ({
          id: item.id,
          description: item.description,
        })),
        total: body.total,
      } as SearchRegionsResult
    }

    if (statusCode === HttpStatusCode.forbidden) throw new ForbiddenError()

    throw new UnexpectedError()
  }
}
