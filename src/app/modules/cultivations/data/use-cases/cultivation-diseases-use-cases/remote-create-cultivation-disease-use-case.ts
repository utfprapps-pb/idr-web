import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { CreateCultivationDiseaseUseCase } from '../../../domain/use-cases/cultivation-diseases-use-cases'

export class RemoteCreateCultivationDiseaseUseCase
  implements CreateCultivationDiseaseUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: CreateCultivationDiseaseUseCase['execute'] = async ({
    propertyId,
    cultivationDisease,
  }) => {
    const url = this.url.replace(':propertyId', String(propertyId))

    const { statusCode } = await this.httpClient.request({
      url,
      method: 'post',
      body: cultivationDisease,
    })

    if (statusCode === HttpStatusCode.created) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para criar uma nova doença para o cultivo'
      )
    }

    throw new UnexpectedError()
  }
}
