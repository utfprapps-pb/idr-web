import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  CultivationDiseaseApiResponse,
  CultivationDiseaseInfestationType,
  CultivationDiseaseModel,
} from '../../../domain/models/cultivation-diseases-model'
import type { GetCultivationDiseasesUseCase } from '../../../domain/use-cases/cultivation-diseases-use-cases'
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'

export class RemoteGetCultivationDiseasesUseCase
  implements GetCultivationDiseasesUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      CultivationDiseaseModel,
      CultivationDiseaseApiResponse,
      ListApiResponse<CultivationDiseaseApiResponse[]>
    >
  ) {}

  execute: GetCultivationDiseasesUseCase['execute'] = async ({
    propertyId,
    filters,
    pagination,
    sort,
  }) => {
    const mapApiProperties: MapApiProperties<
      CultivationDiseaseModel,
      CultivationDiseaseApiResponse
    > = {
      id: 'id',
      cultivation: 'cultivation',
      disease: 'disease',
      infestationType: 'infestationType',
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
            CultivationDiseaseInfestationType,
            string
          > = {
            LOW: 'Branda',
            MEDIUM: 'Média',
            HIGH: 'Alta',
          }

          return {
            id: item.id,
            cultivation: item.cultivation,
            disease: item.disease,
            infestationType:
              infestationTypeMapper[
                item.infestationType as CultivationDiseaseInfestationType
              ],
          }
        }),
        totalPages: Math.ceil(body.numberOfElements / body.pageable.pageSize),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Doenças do Cultivo')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar as doenças do cultivo'
      )
    }

    throw new UnexpectedError()
  }
}
