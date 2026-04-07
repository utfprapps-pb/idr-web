import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type { DeleteProductCategoryUseCase } from '../../../domain/use-cases/product-categories-use-cases'

export class RemoteDeleteProductCategoryUseCase
  implements DeleteProductCategoryUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: DeleteProductCategoryUseCase['execute'] = async ({ id }) => {
    const { statusCode } = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'delete',
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Categoria de Produto')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para excluir uma categoria de produto.'
      )
    }

    throw new UnexpectedError()
  }
}
