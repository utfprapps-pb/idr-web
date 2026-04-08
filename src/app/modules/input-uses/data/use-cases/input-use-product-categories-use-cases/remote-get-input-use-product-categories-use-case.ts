import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  InputUseProductCategoryApiResponse,
  InputUseProductCategoryModel,
} from '../../../domain/models/input-use-product-categories-model'
import type { GetInputUseProductCategoriesUseCase } from '../../../domain/use-cases/input-use-product-categories-use-cases'
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'

export class RemoteGetInputUseProductCategoriesUseCase
  implements GetInputUseProductCategoriesUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      InputUseProductCategoryModel,
      InputUseProductCategoryApiResponse,
      ListApiResponse<InputUseProductCategoryApiResponse[]>
    >
  ) {}

  execute: GetInputUseProductCategoriesUseCase['execute'] = async ({
    filters,
    pagination,
    sort,
  }) => {
    const mapApiProperties: MapApiProperties<
      InputUseProductCategoryModel,
      InputUseProductCategoryApiResponse
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
