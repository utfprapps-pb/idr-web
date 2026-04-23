import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import { type UpdateForageAvailabilityUseCase } from '../../../domain/use-cases/forage-availability-use-cases'

export class RemoteUpdateForageAvailabilityUseCase
  implements UpdateForageAvailabilityUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: UpdateForageAvailabilityUseCase['execute'] = async ({
    propertyId,
    forageAvailability: { id, ...forageAvailability },
  }) => {
    const { statusCode } = await this.httpClient.request({
      url: `${this.url.replace(':propertyId', propertyId.toString())}/${id}`,
      method: 'patch',
      body: forageAvailability,
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para editar uma disponibilidade de forragem.'
      )
    }

    throw new UnexpectedError()
  }
}
