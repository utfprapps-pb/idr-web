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
      name: params.name,
      username: params.email,
      password: params.password,
      confirmPassword: params.confirmPassword,
      cpf: params.cpf.replace(/\D/g, ''),
      phone: params.phone.replace(/\D/g, ''),
      graduationYear: params.graduationYear,
      professionalRegister: params.professionalRegister,
      cep: params.cep.replace(/\D/g, ''),
      street: params.street,
      cityId: params.cityId.value,
      houseNumber: params.houseNumber,
    }

    const { statusCode, body: responseBody } = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body,
    })

    if (statusCode === HttpStatusCode.ok) return

    const apiMessage = (responseBody as { message?: string } | undefined)
      ?.message

    if (statusCode === HttpStatusCode.badRequest)
      throw new BadRequestError(apiMessage)

    throw new UnexpectedError(apiMessage)
  }
}
