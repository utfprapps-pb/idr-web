import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'

import type {
  InputUseActiveIngredientDetailsApiResponse,
  InputUseActiveIngredientDetailsModel,
} from '../../../domain/models/input-use-active-ingredients-model'
import type { GetInputUseActiveIngredientUseCase } from '../../../domain/use-cases/input-use-active-ingredients-use-cases'

export class RemoteGetInputUseActiveIngredientUseCase
  implements GetInputUseActiveIngredientUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      InputUseActiveIngredientDetailsModel,
      InputUseActiveIngredientDetailsApiResponse
    >
  ) {}

  execute: GetInputUseActiveIngredientUseCase['execute'] = async ({ id }) => {
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
      throw new NotFoundError('Princípio Ativo')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para acessar os dados deste princípio ativo.'
      )
    }

    throw new UnexpectedError()
  }
}
