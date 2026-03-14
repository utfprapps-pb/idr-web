import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type { DeleteNutritionalBalancingUseCase } from '../../domain/use-cases'

export class RemoteDeleteNutritionalBalancingUseCase
  implements DeleteNutritionalBalancingUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: DeleteNutritionalBalancingUseCase['execute'] = async ({
    propertyId,
    nutritionalBalancingId,
  }) => {
    const url = this.url.replace(':propertyId', String(propertyId))

    const { statusCode } = await this.httpClient.request({
      url: `${url}/${nutritionalBalancingId}`,
      method: 'delete',
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Balanceamento Nutricional')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para excluir um balanceamento nutricional'
      )
    }

    throw new UnexpectedError()
  }
}
