import { type IHttpClient, HttpStatusCode } from '@/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/domain/errors'

import type { IUpdatePerennialForage } from '@/domain/useCases/perennialForage'

export class RemoteUpdate implements IUpdatePerennialForage {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpClient
  ) {}

  execute: IUpdatePerennialForage['execute'] = async ({
    propertyId,
    perennialForage: { id, ...perennialForage },
  }) => {
    const url = this.url.replace(':propertyId', propertyId)

    const { statusCode } = await this.httpClient.request({
      url: `${url}/${id}`,
      method: 'patch',
      body: perennialForage,
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para editar uma forrageira perene'
      )
    }

    throw new UnexpectedError()
  }
}
