import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { CreateNutritionalBalancingUseCase } from '../../domain/use-cases'

export class RemoteCreateNutritionalBalancingUseCase
  implements CreateNutritionalBalancingUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: CreateNutritionalBalancingUseCase['execute'] = async ({
    propertyId,
    nutritionalBalancings,
  }) => {
    const url = this.url.replace(':propertyId', String(propertyId))

    const { statusCode } = await this.httpClient.request({
      url,
      method: 'post',
      body: nutritionalBalancings,
    })

    if (statusCode === HttpStatusCode.created) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para criar um novo balanceamento nutricional'
      )
    }

    throw new UnexpectedError()
  }
}
