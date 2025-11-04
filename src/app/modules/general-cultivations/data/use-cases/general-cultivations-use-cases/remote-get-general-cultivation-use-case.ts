import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  GeneralCultivationDetailsModel,
  GeneralCultivationDetailsApiResponse,
  GeneralCultivationType,
} from '../../../domain/models/general-cultivations-model'
import type { GetGeneralCultivationUseCase } from '../../../domain/use-cases/general-cultivations-use-cases'

export class RemoteGetGeneralCultivationUseCase
  implements GetGeneralCultivationUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      GeneralCultivationDetailsModel,
      GeneralCultivationDetailsApiResponse
    >
  ) {}

  execute: GetGeneralCultivationUseCase['execute'] = async ({ id }) => {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        name: body.name,
        type: body.type as GeneralCultivationType,
      }
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Cultivo Geral')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar um cultivo geral.'
      )
    }

    throw new UnexpectedError()
  }
}
