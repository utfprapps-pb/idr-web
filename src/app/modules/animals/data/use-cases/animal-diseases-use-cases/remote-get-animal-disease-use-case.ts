import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type { AnimalDiseaseDetailsModel } from '../../../domain/models/animal-diseases-model'
import type { GetAnimalDiseaseUseCase } from '../../../domain/use-cases/animal-diseases-use-cases'

export class RemoteGetAnimalDiseaseUseCase implements GetAnimalDiseaseUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: GetAnimalDiseaseUseCase['execute'] = async ({
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
        diagnosticDate: new Date(body.diagnosticDate),
        diagnostic: body.diagnostic,
      } as AnimalDiseaseDetailsModel
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Doença do Animal')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar uma doença do animal'
      )
    }

    throw new UnexpectedError()
  }
}
