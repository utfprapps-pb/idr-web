import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { CreateCityUseCase } from '../../domain/use-cases'

export class RemoteCreateCityUseCase implements CreateCityUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: CreateCityUseCase['execute'] = async ({ name, state, regionId }) => {
    const { statusCode } = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: { name, state, regionId },
    })

    if (statusCode === HttpStatusCode.ok) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError('Você não tem permissão para criar uma cidade')
    }

    throw new UnexpectedError()
  }
}
