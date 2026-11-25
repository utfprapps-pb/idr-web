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
import type { MapApiProperties, SearchApiResponse } from '@/core/domain/types'

/**
 * Coluna da tabela -> campo da entidade na API (o `sort` do Spring usa o nome
 * da entidade). Coluna fora do mapa não envia `sort`.
 */
const SORT_FIELD_MAP: MapApiProperties<
  AnimalInseminationModel,
  AnimalInseminationApiResponse
> = {
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
      (field) => SORT_FIELD_MAP[field as keyof AnimalInseminationModel]
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
