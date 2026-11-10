import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  AnimalApiResponse,
  AnimalDetailsModel,
} from '../../domain/models/animals-model'
import type { GetAnimalUseCase } from '../../domain/use-cases'

export class RemoteGetAnimalUseCase implements GetAnimalUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalDetailsModel,
      AnimalApiResponse
    >
  ) {}

  execute: GetAnimalUseCase['execute'] = async ({ animalId, propertyId }) => {
    const url = this.url.replace(':propertyId', String(propertyId))

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/${animalId}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        name: body.identifier,
        breed: { value: body.breedId, label: body.breedName ?? '' },
        ecc: body.ecc != null ? String(body.ecc) : '',
        weight: body.currentWeight != null ? String(body.currentWeight) : '',
        milkProduction: '',
      }
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Animal')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError('Você não tem permissão para buscar um animal')
    }

    throw new UnexpectedError()
  }
}
