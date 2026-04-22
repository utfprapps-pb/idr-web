import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { CreateInputUseActiveIngredientUseCase } from '../../../domain/use-cases/input-use-active-ingredients-use-cases'

export class RemoteCreateInputUseActiveIngredientUseCase
  implements CreateInputUseActiveIngredientUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: CreateInputUseActiveIngredientUseCase['execute'] = async ({
    inputUseActiveIngredient,
  }) => {
    const { statusCode } = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: inputUseActiveIngredient,
    })

    if (statusCode === HttpStatusCode.created) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para criar um princípio ativo.'
      )
    }

    throw new UnexpectedError()
  }
}
