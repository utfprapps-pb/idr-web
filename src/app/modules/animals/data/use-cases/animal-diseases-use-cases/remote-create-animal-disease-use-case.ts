import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import { toApi } from '../../mappers/animal-disease-api-mapper'

import type { CreateAnimalDiseaseUseCase } from '../../../domain/use-cases/animal-diseases-use-cases'

export class RemoteCreateAnimalDiseaseUseCase
  implements CreateAnimalDiseaseUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: CreateAnimalDiseaseUseCase['execute'] = async ({
    propertyId,
    animalId,
    animalDisease,
  }) => {
    const url = this.url
      .replace(':propertyId', String(propertyId))
      .replace(':animalId', String(animalId))

    const { statusCode } = await this.httpClient.request({
      url,
      method: 'post',
      body: toApi(animalDisease),
    })

    if (statusCode === HttpStatusCode.ok) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para criar uma nova doença para o animal'
      )
    }

    throw new UnexpectedError()
  }
}
