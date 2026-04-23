import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import { type CreateForageAvailabilityUseCase } from '../../../domain/use-cases/forage-availability-use-cases'

export class RemoteCreateForageAvailabilityUseCase
  implements CreateForageAvailabilityUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: CreateForageAvailabilityUseCase['execute'] = async ({
    propertyId,
    forageAvailability,
  }) => {
    const { statusCode } = await this.httpClient.request({
      url: this.url.replace(':propertyId', propertyId.toString()),
      method: 'post',
      body: forageAvailability,
    })

    if (statusCode === HttpStatusCode.created) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para criar uma disponibilidade de forragem.'
      )
    }

    throw new UnexpectedError()
  }
}
