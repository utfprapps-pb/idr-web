import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import { toApi } from '../../mappers/animal-childbirth-api-mapper'

import type { CreateAnimalChildbirthUseCase } from '../../../domain/use-cases/animal-childbirths-use-cases'

export class RemoteCreateAnimalChildbirthUseCase
  implements CreateAnimalChildbirthUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: CreateAnimalChildbirthUseCase['execute'] = async ({
    propertyId,
    animalId,
    animalChildbirth,
  }) => {
    const url = this.url
      .replace(':propertyId', String(propertyId))
      .replace(':animalId', String(animalId))

    const { statusCode } = await this.httpClient.request({
      url,
      method: 'post',
      body: toApi(animalChildbirth),
    })

    if (statusCode === HttpStatusCode.ok) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para registrar um parto do animal'
      )
    }

    throw new UnexpectedError()
  }
}
