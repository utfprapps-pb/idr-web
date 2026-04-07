import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'

import type {
  ProductCategoryDetailsApiResponse,
  ProductCategoryDetailsModel,
} from '../../../domain/models/product-categories-model'
import type { GetProductCategoryUseCase } from '../../../domain/use-cases/product-categories-use-cases'

export class RemoteGetProductCategoryUseCase
  implements GetProductCategoryUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      ProductCategoryDetailsModel,
      ProductCategoryDetailsApiResponse
    >
  ) {}

  execute: GetProductCategoryUseCase['execute'] = async ({ id }) => {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body)
      return {
        name: body.name,
      }

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Categoria de Produto')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para acessar os dados desta categoria de produto.'
      )
    }

    throw new UnexpectedError()
  }
}
