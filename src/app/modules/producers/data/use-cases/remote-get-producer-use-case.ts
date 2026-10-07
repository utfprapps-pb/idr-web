import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  ProducerDetailsApiResponse,
  ProducerDetailsModel,
} from '../../domain/models/producers-model'
import type { GetProducerUseCase } from '../../domain/use-cases'

export class RemoteGetProducerUseCase implements GetProducerUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      ProducerDetailsModel,
      ProducerDetailsApiResponse
    >
  ) {}

  execute: GetProducerUseCase['execute'] = async (id) => {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        name: body.name,
        cpf: body.cpf,
      }
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Produtores')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError('Você não tem permissão para buscar um produtor')
    }

    throw new UnexpectedError()
  }
}
