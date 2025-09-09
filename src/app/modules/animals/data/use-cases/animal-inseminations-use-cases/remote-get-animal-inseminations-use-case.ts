import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  AnimalInseminationApiResponse,
  AnimalInseminationModel,
} from '../../../domain/models/animal-inseminations-model'
import type { GetAnimalInseminationsUseCase } from '../../../domain/use-cases/animal-inseminations-use-cases'
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'

export class RemoteGetAnimalInseminationsUseCase
  implements GetAnimalInseminationsUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalInseminationModel,
      AnimalInseminationApiResponse,
      ListApiResponse<AnimalInseminationModel[]>
    >
  ) {}

  execute: GetAnimalInseminationsUseCase['execute'] = async ({
    propertyId,
    animalId,
    filters,
    pagination,
    sort,
  }) => {
    const mapApiProperties: MapApiProperties<
      AnimalInseminationModel,
      AnimalInseminationApiResponse
    > = {
      id: 'id',
      date: 'date',
      sire: 'sire',
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
            sire: item.sire,
          }
        }),
        totalPages: Math.ceil(body.numberOfElements / body.pageable.pageSize),
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
