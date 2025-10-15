import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  VegetableDiseaseApiResponse,
  VegetableDiseaseInfestationType,
  VegetableDiseaseModel,
} from '../../../domain/models/vegetable-diseases-model'
import type { GetVegetableDiseasesUseCase } from '../../../domain/use-cases/vegetable-diseases-use-cases'
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'

export class RemoteGetVegetableDiseasesUseCase
  implements GetVegetableDiseasesUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      VegetableDiseaseModel,
      VegetableDiseaseApiResponse,
      ListApiResponse<VegetableDiseaseApiResponse[]>
    >
  ) {}

  execute: GetVegetableDiseasesUseCase['execute'] = async ({
    propertyId,
    filters,
    pagination,
    sort,
  }) => {
    const mapApiProperties: MapApiProperties<
      VegetableDiseaseModel,
      VegetableDiseaseApiResponse
    > = {
      id: 'id',
      vegetable: 'vegetable',
    }

    const url = this.url.replace(':propertyId', String(propertyId))

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
          const infestationTypeMapper: Record<
            VegetableDiseaseInfestationType,
            string
          > = {
            LOW: 'Branda',
            MEDIUM: 'Média',
            HIGH: 'Alta',
          }

          return {
            id: item.id,
            vegetable: item.vegetable,
            disease: item.disease,
            infestationType: infestationTypeMapper[item.infestationType],
          }
        }),
        totalPages: Math.ceil(body.numberOfElements / body.pageable.pageSize),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Doenças do Vegetal')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar as doenças do vegetal'
      )
    }

    throw new UnexpectedError()
  }
}
