import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  CityApiResponse,
  CityModel,
} from '../../domain/models/cities-model'
import type { GetCitiesUseCase } from '../../domain/use-cases'

type CityListApiResponse = {
  currentPage: number
  perPage: number
  total: number
  items: CityApiResponse[]
}

export class RemoteGetCitiesUseCase implements GetCitiesUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      unknown,
      unknown,
      CityListApiResponse
    >
  ) {}

  execute: GetCitiesUseCase['execute'] = async ({
    terms = '',
    page = 0,
    perPage = 10,
  }) => {
    const params = new URLSearchParams({
      terms,
      page: String(page),
      perPage: String(perPage),
    })

    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/search?${params.toString()}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        resources: body.items.map(
          (item): CityModel => ({
            id: item.id,
            name: item.name,
            state: item.state,
            regionId: item.region.id,
            regionName: item.region.name,
          })
        ),
        totalPages: body.total > 0 ? Math.ceil(body.total / perPage) : 1,
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Cidades')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError('Você não tem permissão para buscar cidades')
    }

    throw new UnexpectedError()
  }
}
