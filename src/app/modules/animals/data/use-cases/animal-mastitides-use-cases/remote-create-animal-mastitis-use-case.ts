import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { CreateAnimalMastitisUseCase } from '../../../domain/use-cases/animal-mastitides-use-cases'

export class RemoteCreateAnimalMastitisUseCase
  implements CreateAnimalMastitisUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: CreateAnimalMastitisUseCase['execute'] = async ({
    propertyId,
    animalId,
    animalMastitis,
  }) => {
    const url = this.url
      .replace(':propertyId', String(propertyId))
      .replace(':animalId', String(animalId))

    const { statusCode } = await this.httpClient.request({
      url,
      method: 'post',
      body: animalMastitis,
    })

    if (statusCode === HttpStatusCode.created) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para criar uma mastite para este animal'
      )
    }

    throw new UnexpectedError()
  }
}
