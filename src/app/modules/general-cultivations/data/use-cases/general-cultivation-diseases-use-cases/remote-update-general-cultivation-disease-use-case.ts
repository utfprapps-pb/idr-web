import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { UpdateGeneralCultivationDiseaseUseCase } from '../../../domain/use-cases/general-cultivation-diseases-use-cases'

export class RemoteUpdateGeneralCultivationDiseaseUseCase
  implements UpdateGeneralCultivationDiseaseUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: UpdateGeneralCultivationDiseaseUseCase['execute'] = async ({
    generalCultivationDisease: { id, ...generalCultivationDisease },
  }) => {
    const { statusCode } = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'patch',
      body: generalCultivationDisease,
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para editar uma doença geral de cultivo.'
      )
    }

    throw new UnexpectedError()
  }
}
