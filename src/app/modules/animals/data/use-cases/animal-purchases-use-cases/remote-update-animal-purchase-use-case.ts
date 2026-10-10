import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import { toApi } from '../../mappers/animal-purchase-api-mapper'

import type { UpdateAnimalPurchaseUseCase } from '../../../domain/use-cases/animal-purchases-use-cases'

export class RemoteUpdateAnimalPurchaseUseCase
  implements UpdateAnimalPurchaseUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: UpdateAnimalPurchaseUseCase['execute'] = async ({
    propertyId,
    animalId,
    animalPurchase: { id, ...animalPurchase },
  }) => {
    const url = this.url
      .replace(':propertyId', String(propertyId))
      .replace(':animalId', String(animalId))

    const { statusCode } = await this.httpClient.request({
      url: `${url}/${id}`,
      method: 'put',
      body: toApi(animalPurchase),
    })

    if (statusCode === HttpStatusCode.ok) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para editar uma compra do animal'
      )
    }

    throw new UnexpectedError()
  }
}
