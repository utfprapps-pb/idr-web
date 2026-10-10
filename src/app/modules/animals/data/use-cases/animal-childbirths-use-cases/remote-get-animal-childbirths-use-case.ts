import { format } from 'date-fns'

import { buildSearchQuery, toTotalPages } from '@/core/data/helpers'
import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import { fromApi } from '../../mappers/animal-childbirth-api-mapper'

import type {
  AnimalChildbirthModel,
  AnimalChildbirthApiResponse,
} from '../../../domain/models/animal-childbirths-model'
import type { GetAnimalChildbirthsUseCase } from '../../../domain/use-cases/animal-childbirths-use-cases'
import type { SearchApiResponse } from '@/core/domain/types'

// `breedName` não é coluna do parto: ordenar por raça usa `breedId`.
const SORT_FIELD_MAP: Record<string, string> = {
  date: 'childbirthDate',
  breed: 'breedId',
}

export class RemoteGetAnimalChildbirthsUseCase
  implements GetAnimalChildbirthsUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalChildbirthModel,
      AnimalChildbirthApiResponse,
      SearchApiResponse<AnimalChildbirthApiResponse>
    >
  ) {}

  execute: GetAnimalChildbirthsUseCase['execute'] = async ({
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
          const { date, gender, weight, condition, breed } = fromApi(item)

          return {
            id: item.id,
            date: format(date, 'dd/MM/yyyy'),
            gender: gender === 'MALE' ? 'Macho' : 'Fêmea',
            weight,
            condition: condition === 'ALIVE' ? 'Vivo' : 'Morto',
            breed: breed.label,
          }
        }),
        totalPages: toTotalPages(body),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Partos do Animal')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar os partos do animal'
      )
    }

    throw new UnexpectedError()
  }
}
