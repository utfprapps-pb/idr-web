import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type { PropertyApiResponse } from '../../domain/models/properties-model'
import type { GetPropertiesUseCase } from '../../domain/use-cases'

type PropertySearchApiResponse = {
  currentPage: number
  perPage: number
  total: number
  items: PropertyApiResponse[]
}

export class RemoteGetPropertiesUseCase implements GetPropertiesUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      unknown,
      unknown,
      PropertySearchApiResponse
    >
  ) {}

  execute: GetPropertiesUseCase['execute'] = async ({
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
        resources: body.items.map((item) => ({
          id: item.id,
          name: item.name,
        })),
        totalPages: body.total > 0 ? Math.ceil(body.total / perPage) : 1,
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Propriedades')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar propriedades'
      )
    }

    throw new UnexpectedError()
  }
}
