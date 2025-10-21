import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { UpdateCultivationPestUseCase } from '../../../domain/use-cases/cultivation-pests-use-cases'

export class RemoteUpdateCultivationPestUseCase
  implements UpdateCultivationPestUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: UpdateCultivationPestUseCase['execute'] = async ({
    propertyId,
    cultivationPest: { id, ...cultivationPest },
  }) => {
    const url = this.url.replace(':propertyId', String(propertyId))

    const { statusCode } = await this.httpClient.request({
      url: `${url}/${id}`,
      method: 'patch',
      body: cultivationPest,
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para editar uma praga do cultivo'
      )
    }

    throw new UnexpectedError()
  }
}
