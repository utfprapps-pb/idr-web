import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { CreateRegionUseCase } from '../../domain/use-cases'

export class RemoteCreateRegionUseCase implements CreateRegionUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: CreateRegionUseCase['execute'] = async ({ name }) => {
    const { statusCode } = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: { description: name },
    })

    if (statusCode === HttpStatusCode.ok) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError('Você não tem permissão para criar uma região')
    }

    throw new UnexpectedError()
  }
}
