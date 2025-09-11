import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { CreatePropertyUseCase } from '../../domain/use-cases'

export class RemoteCreatePropertyUseCase implements CreatePropertyUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: CreatePropertyUseCase['execute'] = async (property) => {
    const { statusCode } = await this.httpClient.request({
      url: `${this.url}`,
      method: 'post',
      body: property,
    })

    if (statusCode === HttpStatusCode.created) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para criar uma nova propriedade'
      )
    }

    throw new UnexpectedError()
  }
}
