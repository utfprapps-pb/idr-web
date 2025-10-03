import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { CreateAnimalMedicationUseCase } from '../../../domain/use-cases/animal-medications-use-cases'

export class RemoteCreateAnimalMedicationUseCase
  implements CreateAnimalMedicationUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: CreateAnimalMedicationUseCase['execute'] = async ({
    propertyId,
    animalId,
    animalMedication,
  }) => {
    const url = this.url
      .replace(':propertyId', String(propertyId))
      .replace(':animalId', String(animalId))

    const { statusCode } = await this.httpClient.request({
      url,
      method: 'post',
      body: animalMedication,
    })

    if (statusCode === HttpStatusCode.created) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para criar uma medicação para este animal'
      )
    }

    throw new UnexpectedError()
  }
}
