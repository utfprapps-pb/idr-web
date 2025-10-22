import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { UpdateNutritionalBalancingUseCase } from '../../domain/use-cases'

export class RemoteUpdateNutritionalBalancingUseCase
  implements UpdateNutritionalBalancingUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: UpdateNutritionalBalancingUseCase['execute'] = async ({
    propertyId,
    nutritionalBalancing: { id, ...nutritionalBalancing },
  }) => {
    const url = this.url.replace(':propertyId', String(propertyId))

    const { statusCode } = await this.httpClient.request({
      url: `${url}/${id}`,
      method: 'patch',
      body: nutritionalBalancing,
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para editar um balanceamento nutricional'
      )
    }

    throw new UnexpectedError()
  }
}
