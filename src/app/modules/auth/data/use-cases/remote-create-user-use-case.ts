import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import { BadRequestError, UnexpectedError } from '@/core/domain/errors'

import type { CreateUserUseCase } from '../../domain/use-cases'

export class RemoteCreateUserUseCase implements CreateUserUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<void>
  ) {}

  execute: CreateUserUseCase['execute'] = async (params) => {
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
