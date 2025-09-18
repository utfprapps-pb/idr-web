import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { CreateAnimalInseminationUseCase } from '../../../domain/use-cases/animal-inseminations-use-cases'

export class RemoteCreateAnimalInseminationUseCase
  implements CreateAnimalInseminationUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: CreateAnimalInseminationUseCase['execute'] = async ({
    propertyId,
    animalId,
    animalInsemination,
  }) => {
    const url = this.url
      .replace(':propertyId', String(propertyId))
      .replace(':animalId', String(animalId))

    const { statusCode } = await this.httpClient.request({
      url,
      method: 'post',
      body: animalInsemination,
    })

    if (statusCode === HttpStatusCode.created) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para criar inseminação para este animal.'
      )
    }

    throw new UnexpectedError()
  }
}
