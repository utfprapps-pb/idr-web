import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { CreateInputUseProductCategoryUseCase } from '../../../domain/use-cases/input-use-product-categories-use-cases'

export class RemoteCreateInputUseProductCategoryUseCase
  implements CreateInputUseProductCategoryUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: CreateInputUseProductCategoryUseCase['execute'] = async ({
    inputUseProductCategory,
  }) => {
    const { statusCode } = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: inputUseProductCategory,
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
