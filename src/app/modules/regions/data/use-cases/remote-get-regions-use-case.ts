import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type { RegionModel } from '../../domain/models/regions-model'
import type { GetRegionsUseCase } from '../../domain/use-cases'

type RegionApiItem = { id: string; description: string }

type RegionListApiResponse = {
  currentPage: number
  perPage: number
  total: number
  items: RegionApiItem[]
}

export class RemoteGetRegionsUseCase implements GetRegionsUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      unknown,
      unknown,
      RegionListApiResponse
    >
  ) {}

  execute: GetRegionsUseCase['execute'] = async ({
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
        resources: body.items.map(
          (item): RegionModel => ({
            id: item.id,
            name: item.description,
          })
        ),
        totalPages: body.total > 0 ? Math.ceil(body.total / perPage) : 1,
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Regiões')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError('Você não tem permissão para buscar regiões')
    }

    throw new UnexpectedError()
  }
}
