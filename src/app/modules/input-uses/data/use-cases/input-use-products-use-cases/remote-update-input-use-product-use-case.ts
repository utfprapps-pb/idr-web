import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { UpdateInputUseProductUseCase } from '../../../domain/use-cases/input-use-products-use-cases'

export class RemoteUpdateInputUseProductUseCase
  implements UpdateInputUseProductUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: UpdateInputUseProductUseCase['execute'] = async ({
    inputUseProduct: { id, ...inputUseProduct },
  }) => {
    const { statusCode } = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'patch',
      body: inputUseProduct,
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para atualizar um produto.'
      )
    }

    throw new UnexpectedError()
  }
}
