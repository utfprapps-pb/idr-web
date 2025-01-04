import { type IHttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, NotFoundError } from '@/domain/errors'

import type { CepModel } from '@/domain/models/cepModel'
import type { IGetCep } from '@/domain/useCases/cep'

export class RemoteGetOneCep implements IGetCep {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpClient<CepModel>
  ) {}

  execute: IGetCep['execute'] = async (cep) => {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/${cep}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) return body

    if (statusCode === HttpStatusCode.notFound) throw new NotFoundError('CEP')

    throw new UnexpectedError()
  }
}
