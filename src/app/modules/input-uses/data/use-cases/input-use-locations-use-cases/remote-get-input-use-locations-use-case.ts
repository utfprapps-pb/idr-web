import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  InputUseLocationApiResponse,
  InputUseLocationModel,
} from '../../../domain/models/input-use-locations-model'
import type { GetInputUseLocationsUseCase } from '../../../domain/use-cases/input-use-locations-use-cases'
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'

export class RemoteGetInputUseLocationsUseCase
  implements GetInputUseLocationsUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      InputUseLocationModel,
      InputUseLocationApiResponse,
      ListApiResponse<InputUseLocationApiResponse[]>
    >
  ) {}

  execute: GetInputUseLocationsUseCase['execute'] = async ({
    filters,
    pagination,
    sort,
  }) => {
    const mapApiProperties: MapApiProperties<
      InputUseLocationModel,
      InputUseLocationApiResponse
    > = {
      id: 'id',
      description: 'description',
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
            description: item.description,
          }
        }),
        totalPages: Math.ceil(body.numberOfElements / body.pageable.pageSize),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Local de Utilização')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar os locais de utilização.'
      )
    }

    throw new UnexpectedError()
  }
}
