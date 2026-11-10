import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import { fromApi } from '../../mappers/animal-medication-api-mapper'

import type {
  AnimalMedicationApiResponse,
  AnimalMedicationDetailsModel,
} from '../../../domain/models/animal-medications-model'
import type { GetAnimalMedicationUseCase } from '../../../domain/use-cases/animal-medications-use-cases'

export class RemoteGetAnimalMedicationUseCase
  implements GetAnimalMedicationUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalMedicationDetailsModel,
      AnimalMedicationApiResponse
    >
  ) {}

  execute: GetAnimalMedicationUseCase['execute'] = async ({
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
      return fromApi(body)
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Medicação do Animal')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar uma medicação do animal'
      )
    }

    throw new UnexpectedError()
  }
}
