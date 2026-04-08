import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type { DeleteInputUseProductCategoryUseCase } from '../../../domain/use-cases/input-use-product-categories-use-cases'

export class RemoteDeleteInputUseProductCategoryUseCase
  implements DeleteInputUseProductCategoryUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: DeleteInputUseProductCategoryUseCase['execute'] = async ({ id }) => {
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
