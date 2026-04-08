import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { UpdateInputUseProductCategoryUseCase } from '../../../domain/use-cases/input-use-product-categories-use-cases'

export class RemoteUpdateInputUseProductCategoryUseCase
  implements UpdateInputUseProductCategoryUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: UpdateInputUseProductCategoryUseCase['execute'] = async ({
    inputUseProductCategory: { id, ...inputUseProductCategory },
  }) => {
    const { statusCode } = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'patch',
      body: inputUseProductCategory,
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
