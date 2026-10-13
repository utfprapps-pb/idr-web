import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { UpdateProducerUseCase } from '../../domain/use-cases'

export class RemoteUpdateProducerUseCase implements UpdateProducerUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: UpdateProducerUseCase['execute'] = async ({ id, ...producer }) => {
    const { statusCode } = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'put',
      body: {
        name: producer.name,
        cpf: producer.cpf,
      },
    })

    if (statusCode === HttpStatusCode.ok) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError('Você não tem permissão para editar um produtor')
    }

    throw new UnexpectedError()
  }
}
