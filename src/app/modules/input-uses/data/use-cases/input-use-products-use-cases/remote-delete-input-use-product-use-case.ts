import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { DeleteInputUseProductUseCase } from '../../../domain/use-cases/input-use-products-use-cases'

export class RemoteDeleteInputUseProductUseCase
  implements DeleteInputUseProductUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: DeleteInputUseProductUseCase['execute'] = async ({ id }) => {
    const { statusCode } = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'delete',
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para remover um produto.'
      )
    }

    throw new UnexpectedError()
  }
}
