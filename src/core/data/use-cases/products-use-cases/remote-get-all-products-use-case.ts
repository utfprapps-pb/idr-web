import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'

import type {
  ProductApiResponse,
  ProductModel,
} from '@/core/domain/models/products-model'
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'
import type { GetAllProductsUseCase } from '@/core/domain/use-cases/products-use-cases'

export class RemoteGetAllProductsUseCase implements GetAllProductsUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      ProductModel,
      ProductApiResponse,
      ListApiResponse<ProductApiResponse[]>
    >
  ) {}

  execute: GetAllProductsUseCase['execute'] = async ({ filters }) => {
    const mapApiProperties: MapApiProperties<ProductModel, ProductApiResponse> =
      {
        id: 'id',
        name: 'name',
        description: 'description',
        activeIngredient: 'activeIngredient',
        category: 'category',
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
          name: item.name,
          description: item.description,
          activeIngredient: item.activeIngredient,
          category: item.category,
        })),
        totalPages: Math.ceil(body.numberOfElements / body.pageable.pageSize),
      }
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError()
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Produtos')
    }

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    throw new UnexpectedError()
  }
}
