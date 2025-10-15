import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  VegetableDiseaseDetailsModel,
  VegetableDiseaseDetailsApiResponse,
} from '../../../domain/models/vegetable-diseases-model'
import type { GetVegetableDiseaseUseCase } from '../../../domain/use-cases/vegetable-diseases-use-cases'

export class RemoteGetVegetableDiseaseUseCase
  implements GetVegetableDiseaseUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      VegetableDiseaseDetailsModel,
      VegetableDiseaseDetailsApiResponse
    >
  ) {}

  execute: GetVegetableDiseaseUseCase['execute'] = async ({
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
        vegetable: body.vegetable,
        disease: body.disease,
        infestationType: body.infestationType,
      }
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Doença do Vegetal')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar uma doença do vegetal'
      )
    }

    throw new UnexpectedError()
  }
}
