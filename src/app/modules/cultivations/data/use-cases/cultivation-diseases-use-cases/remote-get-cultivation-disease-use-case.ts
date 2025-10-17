import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  CultivationDiseaseDetailsModel,
  CultivationDiseaseDetailsApiResponse,
  CultivationDiseaseInfestationType,
} from '../../../domain/models/cultivation-diseases-model'
import type { GetCultivationDiseaseUseCase } from '../../../domain/use-cases/cultivation-diseases-use-cases'

export class RemoteGetCultivationDiseaseUseCase
  implements GetCultivationDiseaseUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      CultivationDiseaseDetailsModel,
      CultivationDiseaseDetailsApiResponse
    >
  ) {}

  execute: GetCultivationDiseaseUseCase['execute'] = async ({
    id,
    propertyId,
  }) => {
    const url = this.url.replace(':propertyId', String(propertyId))

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/${id}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        cultivation: {
          value: body.cultivation.id,
          label: body.cultivation.name,
        },
        disease: {
          value: body.disease.id,
          label: body.disease.name,
        },
        infestationType:
          body.infestationType as CultivationDiseaseInfestationType,
      }
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Doença do Cultivo')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar uma doença do cultivo'
      )
    }

    throw new UnexpectedError()
  }
}
