import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { CreateVegetableDiseaseUseCase } from '../../../domain/use-cases/vegetable-diseases-use-cases'

export class RemoteCreateVegetableDiseaseUseCase
  implements CreateVegetableDiseaseUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: CreateVegetableDiseaseUseCase['execute'] = async ({
    propertyId,
    vegetableDisease,
  }) => {
    const url = this.url.replace(':propertyId', String(propertyId))

    const { statusCode } = await this.httpClient.request({
      url,
      method: 'post',
      body: vegetableDisease,
    })

    if (statusCode === HttpStatusCode.created) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para criar uma nova doença para o vegetal'
      )
    }

    throw new UnexpectedError()
  }
}
