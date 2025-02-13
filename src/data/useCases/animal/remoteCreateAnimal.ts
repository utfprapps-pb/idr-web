import { type IHttpClient, HttpStatusCode } from '@/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/domain/errors'

import type { ICreateAnimal } from '@/domain/useCases/animal'

export class RemoteCreateAnimal implements ICreateAnimal {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpClient
  ) {}

  execute: ICreateAnimal['execute'] = async ({ propertyId, animal }) => {
    const url = this.url.replace(':propertyId', propertyId)

    const { statusCode } = await this.httpClient.request({
      url,
      method: 'post',
      body: animal,
    })

    if (statusCode === HttpStatusCode.created) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para criar um novo animal'
      )
    }

    throw new UnexpectedError()
  }
}
