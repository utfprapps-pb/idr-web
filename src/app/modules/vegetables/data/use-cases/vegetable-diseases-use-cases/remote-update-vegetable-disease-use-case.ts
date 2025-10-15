import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { UpdateVegetableDiseaseUseCase } from '../../../domain/use-cases/vegetable-diseases-use-cases'

export class RemoteUpdateVegetableDiseaseUseCase
  implements UpdateVegetableDiseaseUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: UpdateVegetableDiseaseUseCase['execute'] = async ({
    propertyId,
    vegetableDisease: { id, ...vegetableDisease },
  }) => {
    const url = this.url.replace(':propertyId', String(propertyId))

    const { statusCode } = await this.httpClient.request({
      url: `${url}/${id}`,
      method: 'patch',
      body: vegetableDisease,
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para editar uma doença do vegetal'
      )
    }

    throw new UnexpectedError()
  }
}
