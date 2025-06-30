import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  AnimalPregnancyDiagnosisDetailsApiResponse,
  AnimalPregnancyDiagnosisDetailsModel,
} from '../../../domain/models/animal-pregnancy-diagnoses-model'
import type { GetAnimalPregnancyDiagnosisUseCase } from '../../../domain/use-cases/animal-pregnancy-diagnoses-use-cases'

export class RemoteGetAnimalPregnancyDiagnosisUseCase
  implements GetAnimalPregnancyDiagnosisUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalPregnancyDiagnosisDetailsModel,
      AnimalPregnancyDiagnosisDetailsApiResponse
    >
  ) {}

  execute: GetAnimalPregnancyDiagnosisUseCase['execute'] = async ({
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
        lastInseminationDate: new Date(body.lastInseminationDate),
      } as AnimalPregnancyDiagnosisDetailsModel
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Diagnóstico de Gestação do Animal')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar um diagnóstico de gestação do animal'
      )
    }

    throw new UnexpectedError()
  }
}
