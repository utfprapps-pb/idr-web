import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { CreateInputUseProductUseCase } from '../../../domain/use-cases/input-use-products-use-cases'

export class RemoteCreateInputUseProductUseCase
  implements CreateInputUseProductUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: CreateInputUseProductUseCase['execute'] = async (params) => {
    const { statusCode } = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params,
    })

    if (statusCode === HttpStatusCode.created) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError('Você não tem permissão para criar um produto.')
    }

    throw new UnexpectedError()
  }
}
