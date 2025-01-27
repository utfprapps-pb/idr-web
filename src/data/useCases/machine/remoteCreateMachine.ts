import { type IHttpClient, HttpStatusCode } from '@/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/domain/errors'

import type { ICreateMachine } from '@/domain/useCases/machine'

export class RemoteCreateMachine implements ICreateMachine {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpClient
  ) {}

  execute: ICreateMachine['execute'] = async ({ propertyId, machine }) => {
    const url = this.url.replace(':propertyId', propertyId)

    const { statusCode } = await this.httpClient.request({
      url,
      method: 'post',
      body: machine,
    })

    if (statusCode === HttpStatusCode.created) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para criar uma nova máquina'
      )
    }

    throw new UnexpectedError()
  }
}
