import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'

import type {
  InputUseProductCategoryDetailsApiResponse,
  InputUseProductCategoryDetailsModel,
} from '../../../domain/models/input-use-product-categories-model'
import type { GetInputUseProductCategoryUseCase } from '../../../domain/use-cases/input-use-product-categories-use-cases'

export class RemoteGetInputUseProductCategoryUseCase
  implements GetInputUseProductCategoryUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      InputUseProductCategoryDetailsModel,
      InputUseProductCategoryDetailsApiResponse
    >
  ) {}

  execute: GetInputUseProductCategoryUseCase['execute'] = async ({ id }) => {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body)
      return {
        name: body.name,
      }

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Categoria de Produto')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para acessar os dados desta categoria de produto.'
      )
    }

    throw new UnexpectedError()
  }
}
