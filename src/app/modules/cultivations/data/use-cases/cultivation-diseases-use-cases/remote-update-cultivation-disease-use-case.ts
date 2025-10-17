import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { UpdateCultivationDiseaseUseCase } from '../../../domain/use-cases/cultivation-diseases-use-cases'

export class RemoteUpdateCultivationDiseaseUseCase
  implements UpdateCultivationDiseaseUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: UpdateCultivationDiseaseUseCase['execute'] = async ({
    propertyId,
    cultivationDisease: { id, ...cultivationDisease },
  }) => {
    const url = this.url.replace(':propertyId', String(propertyId))

    const { statusCode } = await this.httpClient.request({
      url: `${url}/${id}`,
      method: 'patch',
      body: cultivationDisease,
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para editar uma doença do cultivo'
      )
    }

    throw new UnexpectedError()
  }
}
