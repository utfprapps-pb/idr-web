import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  AnimalSaleDetailsModel,
  AnimalSaleDetailsApiResponse,
  AnimalSaleReason,
  AnimalSaleDestination,
} from '../../../domain/models/animal-sales-model'
import type { GetAnimalSaleUseCase } from '../../../domain/use-cases/animal-sales-use-cases'

export class RemoteGetAnimalSaleUseCase implements GetAnimalSaleUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalSaleDetailsModel,
      AnimalSaleDetailsApiResponse
    >
  ) {}

  execute: GetAnimalSaleUseCase['execute'] = async ({
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
        reason: body.reason as AnimalSaleReason,
        destination: body.destination as AnimalSaleDestination,
        price: body.price,
        weight: body.weight,
      }
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Venda do Animal')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar a venda deste animal'
      )
    }

    throw new UnexpectedError()
  }
}
