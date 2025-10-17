import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  GeneralCultivationPestDetailsModel,
  GeneralCultivationPestDetailsApiResponse,
} from '../../../domain/models/general-cultivation-pests-model'
import type { GetGeneralCultivationPestUseCase } from '../../../domain/use-cases/general-cultivation-pests-use-cases'

export class RemoteGetGeneralCultivationPestUseCase
  implements GetGeneralCultivationPestUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      GeneralCultivationPestDetailsModel,
      GeneralCultivationPestDetailsApiResponse
    >
  ) {}

  execute: GetGeneralCultivationPestUseCase['execute'] = async ({ id }) => {
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
      throw new NotFoundError('Praga de Cultivo Geral')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar uma praga geral de cultivo.'
      )
    }

    throw new UnexpectedError()
  }
}
