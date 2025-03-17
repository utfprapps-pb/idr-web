import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'
import { ITEMS_PER_PAGE } from '@/core/infra/http'

import type { PropertyModel } from '../../domain/models/properties-model'
import type { GetPropertiesUseCase } from '../../domain/use-cases'

export class RemoteGetPropertiesUseCase implements GetPropertiesUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: GetPropertiesUseCase['execute'] = async ({
    filters,
    pagination,
    sort,
  }) => {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}`,
      method: 'get',
      filters,
      pagination,
      sort,
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        resources: body.properties.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item: any) =>
            ({
              id: item.id,
              name: item.name,
              producer: item.producer,
              county: {
                city: item.city,
                state: item.state,
              },
            }) as PropertyModel
        ),
        totalPages: Math.ceil(body.totalRegisters / ITEMS_PER_PAGE),
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
