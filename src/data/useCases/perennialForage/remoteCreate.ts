import { type IHttpClient, HttpStatusCode } from '@/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/domain/errors'

import type { ICreatePerennialForage } from '@/domain/useCases/perennialForage'

export class RemoteCreate implements ICreatePerennialForage {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpClient
  ) {}

  execute: ICreatePerennialForage['execute'] = async ({
    propertyId,
    perennialForage,
  }) => {
    const url = this.url.replace(':propertyId', propertyId)

    const { statusCode } = await this.httpClient.request({
      url,
      method: 'post',
      body: perennialForage,
    })

    if (statusCode === HttpStatusCode.created) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para criar uma nova forrageira perene'
      )
    }

    throw new UnexpectedError()
  }
}
