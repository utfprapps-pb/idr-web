import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  AnimalDiseaseApiResponse,
  AnimalDiseaseModel,
} from '../../../domain/models/animal-diseases-model'
import type { GetAnimalDiseasesUseCase } from '../../../domain/use-cases/animal-diseases-use-cases'
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'

export class RemoteGetAnimalDiseasesUseCase
  implements GetAnimalDiseasesUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalDiseaseModel,
      AnimalDiseaseApiResponse,
      ListApiResponse<AnimalDiseaseModel[]>
    >
  ) {}

  execute: GetAnimalDiseasesUseCase['execute'] = async ({
    propertyId,
    animalId,
    filters,
    pagination,
    sort,
  }) => {
    const mapApiProperties: MapApiProperties<
      AnimalDiseaseModel,
      AnimalDiseaseApiResponse
    > = {
      id: 'id',
      diagnosticDate: 'diagnosticDate',
      diagnostic: 'diagnostic',
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
            diagnosticDate: new Date(item.diagnosticDate),
            diagnostic: item.diagnostic,
          }
        }),
        totalPages: Math.ceil(body.numberOfElements / body.pageable.pageSize),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Doenças do Animal')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar as doenças do animal'
      )
    }

    throw new UnexpectedError()
  }
}
