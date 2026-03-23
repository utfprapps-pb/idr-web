import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { CreateGeneralCultivationPestUseCase } from '../../../domain/use-cases/general-cultivation-pests-use-cases'

export class RemoteCreateGeneralCultivationPestUseCase
  implements CreateGeneralCultivationPestUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: CreateGeneralCultivationPestUseCase['execute'] = async ({
    generalCultivationPest,
  }) => {
    const { statusCode } = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: generalCultivationPest,
    })

    if (statusCode === HttpStatusCode.created) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para criar uma praga de cultivo geral.'
      )
    }

    throw new UnexpectedError()
  }
}
