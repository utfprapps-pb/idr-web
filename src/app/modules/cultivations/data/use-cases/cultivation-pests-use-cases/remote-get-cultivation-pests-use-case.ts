import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  CultivationPestApiResponse,
  CultivationPestInfestationType,
  CultivationPestModel,
} from '../../../domain/models/cultivation-pests-model'
import type { GetCultivationPestsUseCase } from '../../../domain/use-cases/cultivation-pests-use-cases'
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'

export class RemoteGetCultivationPestsUseCase
  implements GetCultivationPestsUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      CultivationPestModel,
      CultivationPestApiResponse,
      ListApiResponse<CultivationPestApiResponse[]>
    >
  ) {}

  execute: GetCultivationPestsUseCase['execute'] = async ({
    propertyId,
    filters,
    pagination,
    sort,
  }) => {
    const mapApiProperties: MapApiProperties<
      CultivationPestModel,
      CultivationPestApiResponse
    > = {
      id: 'id',
      cultivation: 'cultivation',
      pest: 'pest',
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
            CultivationPestInfestationType,
            string
          > = {
            LOW: 'Branda',
            MEDIUM: 'Média',
            HIGH: 'Alta',
          }

          return {
            id: item.id,
            cultivation: item.cultivation,
            pest: item.pest,
            infestationType:
              infestationTypeMapper[
                item.infestationType as CultivationPestInfestationType
              ],
          }
        }),
        totalPages: Math.ceil(body.numberOfElements / body.pageable.pageSize),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Pragas do Cultivo')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar as pragas do cultivo'
      )
    }

    throw new UnexpectedError()
  }
}
