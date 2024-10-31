import { type IHttpClient, HttpStatusCode } from '@/data/protocols/http'
import { BadRequestError, UnexpectedError } from '@/domain/errors'

import type { ICreateUser } from '@/domain/useCases/user'

export class RemoteCreate implements ICreateUser {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpClient<void>
  ) {}

  execute: ICreateUser['execute'] = async (params) => {
    const body = {
      ...params,
      username: params.email,
      displayName: params.name,
      cpf: params.cpf.replace(/\D/g, ''),
      phone: params.phone.replace(/\D/g, ''),
      cep: params.cep.replace(/\D/g, ''),
      county: params.city,
    }

    const { statusCode } = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body,
    })

    if (statusCode === HttpStatusCode.created) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    throw new UnexpectedError()
  }
}
