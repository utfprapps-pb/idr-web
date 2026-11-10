import { buildSearchQuery, toTotalPages } from '@/core/data/helpers'
import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import { fromApi } from '../../mappers/animal-death-api-mapper'

import type {
  AnimalDeathModel,
  AnimalDeathApiResponse,
} from '../../../domain/models/animal-deaths-model'
import type { GetAnimalDeathsUseCase } from '../../../domain/use-cases/animal-deaths-use-cases'
import type { SearchApiResponse } from '@/core/domain/types'

const SORT_FIELD_MAP: Record<string, string> = {
  date: 'deathDate',
}

export class RemoteGetAnimalDeathsUseCase implements GetAnimalDeathsUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalDeathModel,
      AnimalDeathApiResponse,
      SearchApiResponse<AnimalDeathApiResponse>
    >
  ) {}

  execute: GetAnimalDeathsUseCase['execute'] = async ({
    propertyId,
    animalId,
    filters,
    pagination,
    sort,
  }) => {
    const url = this.url
      .replace(':propertyId', String(propertyId))
      .replace(':animalId', String(animalId))

    const query = buildSearchQuery(
      { filters, pagination, sort },
      (field) => SORT_FIELD_MAP[field] ?? field
    )

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/search?${query}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        resources: body.items.map((item) => {
          const { reason, date } = fromApi(item)

          return { id: item.id, reason, date }
        }),
        totalPages: toTotalPages(body),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Óbitos do Animal')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar os óbitos do animal'
      )
    }

    throw new UnexpectedError()
  }
}
