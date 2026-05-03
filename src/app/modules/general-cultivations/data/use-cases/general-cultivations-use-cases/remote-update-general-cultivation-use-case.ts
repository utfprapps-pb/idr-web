import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { UpdateGeneralCultivationUseCase } from '../../../domain/use-cases/general-cultivations-use-cases'

export class RemoteUpdateGeneralCultivationUseCase
  implements UpdateGeneralCultivationUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: UpdateGeneralCultivationUseCase['execute'] = async ({
    generalCultivation: { id, ...generalCultivation },
  }) => {
    const { statusCode } = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'put',
      body: generalCultivation,
    })

    if (
      statusCode === HttpStatusCode.noContent ||
      statusCode === HttpStatusCode.ok
    )
      return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para editar um cultivo geral.'
      )
    }

    throw new UnexpectedError()
  }
}
