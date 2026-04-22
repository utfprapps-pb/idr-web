import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { UpdateInputUseActiveIngredientUseCase } from '../../../domain/use-cases/input-use-active-ingredients-use-cases'

export class RemoteUpdateInputUseActiveIngredientUseCase
  implements UpdateInputUseActiveIngredientUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: UpdateInputUseActiveIngredientUseCase['execute'] = async ({
    inputUseActiveIngredient: { id, ...inputUseActiveIngredient },
  }) => {
    const { statusCode } = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'patch',
      body: inputUseActiveIngredient,
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para editar um princípio ativo.'
      )
    }

    throw new UnexpectedError()
  }
}
