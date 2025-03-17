import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { CreateAnimalChildBirthUseCase } from '../../domain/use-cases'

export class RemoteCreateAnimalChildBirthUseCase
  implements CreateAnimalChildBirthUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: CreateAnimalChildBirthUseCase['execute'] = async ({
    propertyId,
    animalId,
    animalChildBirth,
  }) => {
    const url = this.url
      .replace(':propertyId', propertyId)
      .replace(':animalId', animalId)

    const { statusCode } = await this.httpClient.request({
      url,
      method: 'post',
      body: animalChildBirth,
    })

    if (statusCode === HttpStatusCode.created) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para criar um novo parto para esse animal'
      )
    }

    throw new UnexpectedError()
  }
}
