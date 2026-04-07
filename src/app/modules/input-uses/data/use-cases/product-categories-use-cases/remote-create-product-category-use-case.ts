import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { CreateProductCategoryUseCase } from '../../../domain/use-cases/product-categories-use-cases'

export class RemoteCreateProductCategoryUseCase
  implements CreateProductCategoryUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: CreateProductCategoryUseCase['execute'] = async ({
    productCategory,
  }) => {
    const { statusCode } = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: productCategory,
    })

    if (statusCode === HttpStatusCode.created) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para criar uma categoria de produto.'
      )
    }

    throw new UnexpectedError()
  }
}
