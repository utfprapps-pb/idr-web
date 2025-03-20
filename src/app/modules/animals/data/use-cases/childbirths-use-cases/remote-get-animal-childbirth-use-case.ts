import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type { AnimalChildBirthDetailsModel } from '../../../domain/models/animal-childbirths-model'
import type { GetAnimalChildBirthUseCase } from '../../../domain/use-cases/animal-childbirths-use-cases'

export class RemoteGetAnimalChildBirthUseCase
  implements GetAnimalChildBirthUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: GetAnimalChildBirthUseCase['execute'] = async ({
    id,
    animalId,
    propertyId,
  }) => {
    const url = this.url
      .replace(':propertyId', propertyId)
      .replace(':animalId', animalId)

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/${id}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        date: new Date(body.date),
        breed: body.breed,
        condition: body.condition,
        gender: body.gender,
        weight: body.weight,
      } as AnimalChildBirthDetailsModel
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Parto do Animal')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar um parto do animal'
      )
    }

    throw new UnexpectedError()
  }
}
