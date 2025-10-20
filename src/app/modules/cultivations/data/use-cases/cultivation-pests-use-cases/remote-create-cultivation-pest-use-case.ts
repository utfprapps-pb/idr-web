import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { CreateCultivationPestUseCase } from '../../../domain/use-cases/cultivation-pests-use-cases'

export class RemoteCreateCultivationPestUseCase
  implements CreateCultivationPestUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: CreateCultivationPestUseCase['execute'] = async ({
    propertyId,
    cultivationPest,
  }) => {
    const url = this.url.replace(':propertyId', String(propertyId))

    const { statusCode } = await this.httpClient.request({
      url,
      method: 'post',
      body: cultivationPest,
    })

    if (statusCode === HttpStatusCode.created) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para criar uma nova praga para o cultivo'
      )
    }

    throw new UnexpectedError()
  }
}
