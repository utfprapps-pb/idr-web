import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  InputUseProductDetailsApiResponse,
  InputUseProductDetailsModel,
} from '../../../domain/models/input-use-products-model'
import type { GetInputUseProductUseCase } from '../../../domain/use-cases/input-use-products-use-cases'

export class RemoteGetInputUseProductUseCase
  implements GetInputUseProductUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      InputUseProductDetailsModel,
      InputUseProductDetailsApiResponse
    >
  ) {}

  execute: GetInputUseProductUseCase['execute'] = async ({ id }) => {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        name: body.name,
        category: body.category,
      }
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Produto')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError('Você não tem permissão para buscar um produto')
    }

    throw new UnexpectedError()
  }
}
