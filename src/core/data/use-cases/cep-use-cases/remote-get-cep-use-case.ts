import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import { UnexpectedError, NotFoundError } from '@/core/domain/errors'

import type { CepModel } from '@/core/domain/models/cep-model'
import type { GetCepUseCase } from '@/core/domain/use-cases/cep-use-cases'

export class RemoteGetCepUseCase implements GetCepUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<CepModel>
  ) {}

  execute: GetCepUseCase['execute'] = async (cep) => {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/${cep}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) return body

    if (statusCode === HttpStatusCode.notFound) throw new NotFoundError('CEP')

    throw new UnexpectedError()
  }
}
