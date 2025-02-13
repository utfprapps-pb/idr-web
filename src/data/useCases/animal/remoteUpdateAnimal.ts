import { type IHttpClient, HttpStatusCode } from '@/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/domain/errors'

import type { IUpdateAnimal } from '@/domain/useCases/animal'

export class RemoteUpdateAnimal implements IUpdateAnimal {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpClient
  ) {}

  execute: IUpdateAnimal['execute'] = async ({
    propertyId,
    animal: { id, ...animal },
  }) => {
    const url = this.url.replace(':propertyId', propertyId)

    const { statusCode } = await this.httpClient.request({
      url: `${url}/${id}`,
      method: 'patch',
      body: animal,
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError('Você não tem permissão para editar um animal')
    }

    throw new UnexpectedError()
  }
}
