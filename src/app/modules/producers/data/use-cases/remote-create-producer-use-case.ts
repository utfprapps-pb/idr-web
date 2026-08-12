import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { CreateProducerUseCase } from '../../domain/use-cases'

export class RemoteCreateProducerUseCase implements CreateProducerUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: CreateProducerUseCase['execute'] = async (producer) => {
    const { statusCode } = await this.httpClient.request({
      url: `${this.url}`,
      method: 'post',
      body: {
        name: producer.name,
        cpf: producer.cpf,
      },
    })

    if (statusCode === HttpStatusCode.ok) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError('Você não tem permissão para criar um produtor')
    }

    throw new UnexpectedError()
  }
}
