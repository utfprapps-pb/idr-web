import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type { DeleteInputUseActiveIngredientUseCase } from '../../../domain/use-cases/input-use-active-ingredients-use-cases'

export class RemoteDeleteInputUseActiveIngredientUseCase
  implements DeleteInputUseActiveIngredientUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: DeleteInputUseActiveIngredientUseCase['execute'] = async ({
    id,
  }) => {
    const { statusCode } = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'delete',
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Princípio Ativo')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para excluir um princípio ativo.'
      )
    }

    throw new UnexpectedError()
  }
}
