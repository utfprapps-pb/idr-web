import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  ProductCategoryApiResponse,
  ProductCategoryModel,
} from '../../../domain/models/product-categories-model'
import type { GetProductCategoriesUseCase } from '../../../domain/use-cases/product-categories-use-cases'
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'

export class RemoteGetProductCategoriesUseCase
  implements GetProductCategoriesUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      ProductCategoryModel,
      ProductCategoryApiResponse,
      ListApiResponse<ProductCategoryApiResponse[]>
    >
  ) {}

  execute: GetProductCategoriesUseCase['execute'] = async ({
    filters,
    pagination,
    sort,
  }) => {
    const mapApiProperties: MapApiProperties<
      ProductCategoryModel,
      ProductCategoryApiResponse
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
      throw new NotFoundError('Categoria de Produto')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar as categorias de produtos.'
      )
    }

    throw new UnexpectedError()
  }
}
