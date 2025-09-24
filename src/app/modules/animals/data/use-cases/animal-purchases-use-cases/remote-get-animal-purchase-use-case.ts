import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  AnimalPurchaseDetailsModel,
  AnimalPurchaseDetailsApiResponse,
} from '../../../domain/models/animal-purchases-model'
import type { GetAnimalPurchaseUseCase } from '../../../domain/use-cases/animal-purchases-use-cases'

export class RemoteGetAnimalPurchaseUseCase
  implements GetAnimalPurchaseUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalPurchaseDetailsModel,
      AnimalPurchaseDetailsApiResponse
    >
  ) {}

  execute: GetAnimalPurchaseUseCase['execute'] = async ({
    id,
    animalId,
    propertyId,
  }) => {
    const url = this.url
      .replace(':propertyId', String(propertyId))
      .replace(':animalId', String(animalId))

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/${id}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        date: new Date(body.date),
        birthDate: new Date(body.birthDate),
        price: body.price,
        weight: body.weight,
      }
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Compra do Animal')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar a compra deste animal'
      )
    }

    throw new UnexpectedError()
  }
}
