import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  CultivationPestDetailsModel,
  CultivationPestDetailsApiResponse,
  CultivationPestInfestationType,
} from '../../../domain/models/cultivation-pests-model'
import type { GetCultivationPestUseCase } from '../../../domain/use-cases/cultivation-pests-use-cases'

export class RemoteGetCultivationPestUseCase
  implements GetCultivationPestUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      CultivationPestDetailsModel,
      CultivationPestDetailsApiResponse
    >
  ) {}

  execute: GetCultivationPestUseCase['execute'] = async ({
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
        pest: {
          value: body.pest.id,
          label: body.pest.name,
        },
        infestationType: body.infestationType as CultivationPestInfestationType,
      }
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Praga do Cultivo')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar uma praga do cultivo'
      )
    }

    throw new UnexpectedError()
  }
}
