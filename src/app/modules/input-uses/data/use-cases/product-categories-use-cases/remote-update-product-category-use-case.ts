import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { UpdateProductCategoryUseCase } from '../../../domain/use-cases/product-categories-use-cases'

export class RemoteUpdateProductCategoryUseCase
  implements UpdateProductCategoryUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: UpdateProductCategoryUseCase['execute'] = async ({
    productCategory: { id, ...productCategory },
  }) => {
    const { statusCode } = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'patch',
      body: productCategory,
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para editar uma categoria de produto.'
      )
    }

    throw new UnexpectedError()
  }
}
