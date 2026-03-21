import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  GeneralCultivationPestApiResponse,
  GeneralCultivationPestModel,
} from '../../../domain/models/general-cultivation-pests-model'
import type { GetGeneralCultivationPestsUseCase } from '../../../domain/use-cases/general-cultivation-pests-use-cases'
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'

export class RemoteGetGeneralCultivationPestsUseCase
  implements GetGeneralCultivationPestsUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      GeneralCultivationPestModel,
      GeneralCultivationPestApiResponse,
      ListApiResponse<GeneralCultivationPestApiResponse[]>
    >
  ) {}

  execute: GetGeneralCultivationPestsUseCase['execute'] = async ({
    filters,
    pagination,
    sort,
  }) => {
    const mapApiProperties: MapApiProperties<
      GeneralCultivationPestModel,
      GeneralCultivationPestApiResponse
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
      throw new NotFoundError('Praga de Cultivo Geral')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar as pragas de cultivo geral.'
      )
    }

    throw new UnexpectedError()
  }
}
