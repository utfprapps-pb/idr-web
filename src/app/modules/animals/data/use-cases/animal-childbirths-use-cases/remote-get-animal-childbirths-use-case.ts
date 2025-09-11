import { format } from 'date-fns'

import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  AnimalChildbirthApiResponse,
  AnimalChildbirthModel,
} from '../../../domain/models/animal-childbirths-model'
import type { GetAnimalChildbirthsUseCase } from '../../../domain/use-cases/animal-childbirths-use-cases'
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'

export class RemoteGetAnimalChildbirthsUseCase
  implements GetAnimalChildbirthsUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalChildbirthModel,
      AnimalChildbirthApiResponse,
      ListApiResponse<AnimalChildbirthModel[]>
    >
  ) {}

  execute: GetAnimalChildbirthsUseCase['execute'] = async ({
    propertyId,
    animalId,
    filters,
    pagination,
    sort,
  }) => {
    const mapApiProperties: MapApiProperties<
      AnimalChildbirthModel,
      AnimalChildbirthApiResponse
    > = {
      id: 'id',
      breed: 'breed',
      condition: 'condition',
      date: 'date',
      gender: 'gender',
      weight: 'weight',
    }

    const url = this.url
      .replace(':propertyId', String(propertyId))
      .replace(':animalId', String(animalId))

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/search`,
      method: 'post',
      filters,
      pagination,
      sort,
      mapApiProperties,
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        resources: body.content.map((item) => {
          const condition = item.condition === 'ALIVE' ? 'Vivo' : 'Morto'
          const gender = item.gender === 'MALE' ? 'Macho' : 'Fêmea'

          return {
            id: item.id,
            breed: item.breed,
            condition,
            gender,
            date: format(new Date(item.date), 'dd/MM/yyyy'),
            weight: item.weight,
          }
        }),
        totalPages: Math.ceil(body.numberOfElements / body.pageable.pageSize),
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
