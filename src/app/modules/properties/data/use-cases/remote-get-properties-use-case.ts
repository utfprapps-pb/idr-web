import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  PropertyApiResponse,
  PropertyModel,
} from '../../domain/models/properties-model'
import type { GetPropertiesUseCase } from '../../domain/use-cases'
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'

export class RemoteGetPropertiesUseCase implements GetPropertiesUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      PropertyModel,
      PropertyApiResponse,
      ListApiResponse<PropertyApiResponse[]>
    >
  ) {}

  execute: GetPropertiesUseCase['execute'] = async ({
    filters,
    pagination,
    sort,
  }) => {
    const mapApiProperties: MapApiProperties<
      PropertyModel,
      PropertyApiResponse
    > = {
      producer: 'user.displayName',
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
        resources: body.content.map((item) => ({
          id: String(item.id),
          name: 'MOCKADO - SEM RETORNO DA API', // todo: remove mock
          producer: item.user.displayName,
          county: {
            city: 'MOCKADO - SEM RETORNO DA API', // todo: remove mock
            state: 'MOCKADO - SEM RETORNO DA API', // todo: remove mock
          },
        })),
        totalPages: Math.ceil(body.numberOfElements / body.pageable.pageSize),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Propriedades')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar propriedades'
      )
    }

    throw new UnexpectedError()
  }
}
