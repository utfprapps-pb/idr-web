import { buildSearchQuery, toTotalPages } from '@/core/data/helpers'
import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import { fromApi } from '../../mappers/animal-insemination-api-mapper'

import type {
  AnimalInseminationModel,
  AnimalInseminationApiResponse,
} from '../../../domain/models/animal-inseminations-model'
import type { GetAnimalInseminationsUseCase } from '../../../domain/use-cases/animal-inseminations-use-cases'
import type { SearchApiResponse } from '@/core/domain/types'

const SORT_FIELD_MAP: Record<string, string> = {
  sire: 'bull',
  date: 'iaDate',
}

export class RemoteGetAnimalInseminationsUseCase
  implements GetAnimalInseminationsUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalInseminationModel,
      AnimalInseminationApiResponse,
      SearchApiResponse<AnimalInseminationApiResponse>
    >
  ) {}

  execute: GetAnimalInseminationsUseCase['execute'] = async ({
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
          const { date, sire } = fromApi(item)

          return { id: item.id, date, sire }
        }),
        totalPages: toTotalPages(body),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Inseminações do Animal')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar inseminações deste animal.'
      )
    }

    throw new UnexpectedError()
  }
}
