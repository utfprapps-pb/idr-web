import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'

import type {
  ProductCategoryApiResponse,
  ProductCategoryModel,
} from '@/core/domain/models/product-categories-model'
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'
import type { GetAllProductCategoriesUseCase } from '@/core/domain/use-cases/product-categories-use-cases'

export class RemoteGetAllProductCategoriesUseCase
  implements GetAllProductCategoriesUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      ProductCategoryModel,
      ProductCategoryApiResponse,
      ListApiResponse<ProductCategoryApiResponse[]>
    >
  ) {}

  execute: GetAllProductCategoriesUseCase['execute'] = async ({ filters }) => {
    const mapApiProperties: MapApiProperties<
      ProductCategoryModel,
      ProductCategoryApiResponse
    > = {
      id: 'id',
      description: 'description',
    }

    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/search`,
      method: 'post',
      filters,
      mapApiProperties,
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        resources: body.content.map((item) => ({
          id: item.id,
          description: item.description,
        })),
        totalPages: Math.ceil(body.numberOfElements / body.pageable.pageSize),
      }
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError()
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Categorias de Produtos')
    }

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    throw new UnexpectedError()
  }
}
