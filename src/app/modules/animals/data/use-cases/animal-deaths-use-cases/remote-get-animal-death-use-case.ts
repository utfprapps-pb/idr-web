import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  AnimalDeathDetailsModel,
  AnimalDeathDetailsApiResponse,
} from '../../../domain/models/animal-deaths-model'
import type { GetAnimalDeathUseCase } from '../../../domain/use-cases/animal-deaths-use-cases'

export class RemoteGetAnimalDeathUseCase implements GetAnimalDeathUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalDeathDetailsModel,
      AnimalDeathDetailsApiResponse
    >
  ) {}

  execute: GetAnimalDeathUseCase['execute'] = async ({
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
        reason: body.reason,
      }
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Óbito do Animal')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar óbito deste animal.'
      )
    }

    throw new UnexpectedError()
  }
}
