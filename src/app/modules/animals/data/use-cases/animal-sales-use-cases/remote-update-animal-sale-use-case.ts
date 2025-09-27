import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { UpdateAnimalSaleUseCase } from '../../../domain/use-cases/animal-sales-use-cases'

export class RemoteUpdateAnimalSaleUseCase implements UpdateAnimalSaleUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: UpdateAnimalSaleUseCase['execute'] = async ({
    propertyId,
    animalId,
    animalSale: { id, ...animalSale },
  }) => {
    const url = this.url
      .replace(':propertyId', String(propertyId))
      .replace(':animalId', String(animalId))

    const { statusCode } = await this.httpClient.request({
      url: `${url}/${id}`,
      method: 'patch',
      body: animalSale,
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para editar uma venda do animal'
      )
    }

    throw new UnexpectedError()
  }
}
