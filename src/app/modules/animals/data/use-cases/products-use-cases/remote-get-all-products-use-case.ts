import { buildSearchQuery } from '@/core/data/helpers'
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
} from '../../../domain/models/products-model'
import type { GetAllProductsUseCase } from '../../../domain/use-cases/products-use-cases'
import type { SearchApiResponse } from '@/core/domain/types'

/** Busca no catálogo `/products` e devolve as opções do seletor de produto. */
export class RemoteGetAllProductsUseCase implements GetAllProductsUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      ProductModel,
      ProductApiResponse,
      SearchApiResponse<ProductApiResponse>
    >
  ) {}

  execute: GetAllProductsUseCase['execute'] = async ({
    filters,
    pagination,
  }) => {
    const query = buildSearchQuery({ filters, pagination })

    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/search?${query}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return body.items.map((item) => ({
        label: item.name,
        value: item.id,
        extraData: { activePrinciple: item.activePrinciple?.name ?? '' },
      }))
    }

    if (statusCode === HttpStatusCode.forbidden) throw new ForbiddenError()

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Produtos')
    }

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    throw new UnexpectedError()
  }
}
