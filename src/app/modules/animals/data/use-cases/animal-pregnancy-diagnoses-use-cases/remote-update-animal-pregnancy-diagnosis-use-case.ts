import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { UpdateAnimalPregnancyDiagnosisUseCase } from '../../../domain/use-cases/animal-pregnancy-diagnoses-use-cases'

export class RemoteUpdateAnimalPregnancyDiagnosisUseCase
  implements UpdateAnimalPregnancyDiagnosisUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: UpdateAnimalPregnancyDiagnosisUseCase['execute'] = async ({
    propertyId,
    animalId,
    animalPregnancyDiagnosis: { id, ...animalPregnancyDiagnosis },
  }) => {
    const url = this.url
      .replace(':propertyId', String(propertyId))
      .replace(':animalId', String(animalId))

    const { statusCode } = await this.httpClient.request({
      url: `${url}/${id}`,
      method: 'patch',
      body: animalPregnancyDiagnosis,
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para editar um diagnóstico de gestação para este animal'
      )
    }

    throw new UnexpectedError()
  }
}
