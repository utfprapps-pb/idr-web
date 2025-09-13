import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  AnimalDeathApiResponse,
  AnimalDeathModel,
} from '../../../domain/models/animal-deaths-model'
import type { GetAnimalDeathsUseCase } from '../../../domain/use-cases/animal-deaths-use-cases'
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'

export class RemoteGetAnimalDeathsUseCase implements GetAnimalDeathsUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalDeathModel,
      AnimalDeathApiResponse,
      ListApiResponse<AnimalDeathModel[]>
    >
  ) {}

  execute: GetAnimalDeathsUseCase['execute'] = async ({
    propertyId,
    animalId,
    filters,
    pagination,
    sort,
  }) => {
    const mapApiProperties: MapApiProperties<
      AnimalDeathModel,
      AnimalDeathApiResponse
    > = {
      id: 'id',
      date: 'date',
      reason: 'reason',
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
          return {
            id: item.id,
            date: new Date(item.date),
            reason: item.reason,
          }
        }),
        totalPages: Math.ceil(body.numberOfElements / body.pageable.pageSize),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Óbitos do Animal')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar óbitos deste animal.'
      )
    }

    throw new UnexpectedError()
  }
}
