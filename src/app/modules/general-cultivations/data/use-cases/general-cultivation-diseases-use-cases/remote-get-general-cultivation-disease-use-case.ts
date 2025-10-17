import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  GeneralCultivationDiseaseDetailsModel,
  GeneralCultivationDiseaseDetailsApiResponse,
} from '../../../domain/models/general-cultivation-diseases-model'
import type { GetGeneralCultivationDiseaseUseCase } from '../../../domain/use-cases/general-cultivation-diseases-use-cases'

export class RemoteGetGeneralCultivationDiseaseUseCase
  implements GetGeneralCultivationDiseaseUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      GeneralCultivationDiseaseDetailsModel,
      GeneralCultivationDiseaseDetailsApiResponse
    >
  ) {}

  execute: GetGeneralCultivationDiseaseUseCase['execute'] = async ({ id }) => {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        name: body.name,
      }
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Doença de Cultivo Geral')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar uma doença geral de cultivo.'
      )
    }

    throw new UnexpectedError()
  }
}
