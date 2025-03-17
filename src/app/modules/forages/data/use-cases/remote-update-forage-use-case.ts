import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { UpdateForageUseCase } from '../../domain/use-cases'

export class RemoteUpdateForageUseCase implements UpdateForageUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: UpdateForageUseCase['execute'] = async ({
    propertyId,
    forage: { id, ...forage },
  }) => {
    const url = this.url.replace(':propertyId', propertyId)

    const { statusCode } = await this.httpClient.request({
      url: `${url}/${id}`,
      method: 'patch',
      body: forage,
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para editar uma forrageira'
      )
    }

    throw new UnexpectedError()
  }
}
