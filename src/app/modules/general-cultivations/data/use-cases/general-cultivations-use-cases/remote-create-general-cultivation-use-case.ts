import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { CreateGeneralCultivationUseCase } from '../../../domain/use-cases/general-cultivations-use-cases'

export class RemoteCreateGeneralCultivationUseCase
  implements CreateGeneralCultivationUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: CreateGeneralCultivationUseCase['execute'] = async ({
    generalCultivation,
  }) => {
    const { statusCode } = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: generalCultivation,
    })

    if (statusCode === HttpStatusCode.created) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para criar um cultivo geral.'
      )
    }

    throw new UnexpectedError()
  }
}
