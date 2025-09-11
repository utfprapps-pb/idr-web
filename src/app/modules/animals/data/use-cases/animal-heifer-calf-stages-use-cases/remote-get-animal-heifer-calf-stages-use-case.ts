import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  AnimalHeiferCalfStageApiResponse,
  AnimalHeiferCalfStageModel,
} from '../../../domain/models/animal-heifer-calf-stages-model'
import type { GetAnimalHeiferCalfStagesUseCase } from '../../../domain/use-cases/animal-heifer-calf-stages-use-cases'
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'

export class RemoteGetAnimalHeiferCalfStagesUseCase
  implements GetAnimalHeiferCalfStagesUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalHeiferCalfStageModel,
      AnimalHeiferCalfStageApiResponse,
      ListApiResponse<AnimalHeiferCalfStageModel[]>
    >
  ) {}

  execute: GetAnimalHeiferCalfStagesUseCase['execute'] = async ({
    propertyId,
    animalId,
    filters,
    pagination,
    sort,
  }) => {
    const mapApiProperties: MapApiProperties<
      AnimalHeiferCalfStageModel,
      AnimalHeiferCalfStageApiResponse
    > = {
      id: 'id',
      weighingDate: 'weighingDate',
      weight: 'weight',
      ecc: 'ecc',
      age: 'age',
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
            weighingDate: new Date(item.weighingDate),
            weight: item.weight,
            ecc: item.ecc,
            age: item.age,
          }
        }),
        totalPages: Math.ceil(body.numberOfElements / body.pageable.pageSize),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Fases bezerra novilha')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar as fases bezerra novilha'
      )
    }

    throw new UnexpectedError()
  }
}
