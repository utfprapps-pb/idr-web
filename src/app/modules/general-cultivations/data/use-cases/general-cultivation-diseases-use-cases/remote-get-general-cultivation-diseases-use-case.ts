import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  GeneralCultivationDiseaseApiResponse,
  GeneralCultivationDiseaseModel,
} from '../../../domain/models/general-cultivation-diseases-model'
import type { GetGeneralCultivationDiseasesUseCase } from '../../../domain/use-cases/general-cultivation-diseases-use-cases'
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'

export class RemoteGetGeneralCultivationDiseasesUseCase
  implements GetGeneralCultivationDiseasesUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      GeneralCultivationDiseaseModel,
      GeneralCultivationDiseaseApiResponse,
      ListApiResponse<GeneralCultivationDiseaseApiResponse[]>
    >
  ) {}

  execute: GetGeneralCultivationDiseasesUseCase['execute'] = async ({
    filters,
    pagination,
    sort,
  }) => {
    const mapApiProperties: MapApiProperties<
      GeneralCultivationDiseaseModel,
      GeneralCultivationDiseaseApiResponse
    > = {
      id: 'id',
      name: 'name',
    }

    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/search`,
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
            name: item.name,
          }
        }),
        totalPages: Math.ceil(body.numberOfElements / body.pageable.pageSize),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Doença de Cultivo Geral')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar as doenças gerais de cultivo.'
      )
    }

    throw new UnexpectedError()
  }
}
