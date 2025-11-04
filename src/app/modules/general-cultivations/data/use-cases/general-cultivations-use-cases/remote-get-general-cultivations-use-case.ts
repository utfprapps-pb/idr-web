import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  GeneralCultivationApiResponse,
  GeneralCultivationModel,
} from '../../../domain/models/general-cultivations-model'
import type { GetGeneralCultivationsUseCase } from '../../../domain/use-cases/general-cultivations-use-cases'
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'

export class RemoteGetGeneralCultivationsUseCase
  implements GetGeneralCultivationsUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      GeneralCultivationModel,
      GeneralCultivationApiResponse,
      ListApiResponse<GeneralCultivationApiResponse[]>
    >
  ) {}

  execute: GetGeneralCultivationsUseCase['execute'] = async ({
    filters,
    pagination,
    sort,
  }) => {
    const mapApiProperties: MapApiProperties<
      GeneralCultivationModel,
      GeneralCultivationApiResponse
    > = {
      id: 'id',
      name: 'name',
      type: 'type',
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
            type: item.type,
          }
        }),
        totalPages: Math.ceil(body.numberOfElements / body.pageable.pageSize),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Cultivo Geral')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar os cultivos gerais.'
      )
    }

    throw new UnexpectedError()
  }
}
