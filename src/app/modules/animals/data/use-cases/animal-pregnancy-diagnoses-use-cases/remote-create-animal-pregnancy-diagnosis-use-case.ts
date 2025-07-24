import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { CreateAnimalPregnancyDiagnosisUseCase } from '../../../domain/use-cases/animal-pregnancy-diagnoses-use-cases'

export class RemoteCreateAnimalPregnancyDiagnosisUseCase
  implements CreateAnimalPregnancyDiagnosisUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: CreateAnimalPregnancyDiagnosisUseCase['execute'] = async ({
    propertyId,
    animalId,
    animalPregnancyDiagnosis,
  }) => {
    const url = this.url
      .replace(':propertyId', String(propertyId))
      .replace(':animalId', String(animalId))

    const { statusCode } = await this.httpClient.request({
      url,
      method: 'post',
      body: animalPregnancyDiagnosis,
    })

    if (statusCode === HttpStatusCode.created) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para criar um diagnóstico de gestação para este animal'
      )
    }

    throw new UnexpectedError()
  }
}
