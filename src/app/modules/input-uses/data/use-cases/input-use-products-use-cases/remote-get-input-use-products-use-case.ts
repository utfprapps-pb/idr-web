import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  InputUseProductApiResponse,
  InputUseProductModel,
} from '../../../domain/models/input-use-products-model'
import type { GetInputUseProductsUseCase } from '../../../domain/use-cases/input-use-products-use-cases'
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'

export class RemoteGetInputUseProductsUseCase
  implements GetInputUseProductsUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      InputUseProductModel,
      InputUseProductApiResponse,
      ListApiResponse<InputUseProductApiResponse[]>
    >
  ) {}

  execute: GetInputUseProductsUseCase['execute'] = async ({
    filters,
    pagination,
    sort,
  }) => {
    const mapApiProperties: MapApiProperties<
      InputUseProductModel,
      InputUseProductApiResponse
    > = {
      id: 'id',
      name: 'name',
      category: 'category',
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
            category: item.category,
          }
        }),
        totalPages: body.totalPages,
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Produtos')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar os produtos.'
      )
    }

    throw new UnexpectedError()
  }
}
