import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { UpdateGeneralCultivationPestUseCase } from '../../../domain/use-cases/general-cultivation-pests-use-cases'

export class RemoteUpdateGeneralCultivationPestUseCase
  implements UpdateGeneralCultivationPestUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: UpdateGeneralCultivationPestUseCase['execute'] = async ({
    generalCultivationPest: { id, ...generalCultivationPest },
  }) => {
    const { statusCode } = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'patch',
      body: generalCultivationPest,
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para editar uma praga de cultivo geral.'
      )
    }

    throw new UnexpectedError()
  }
}
