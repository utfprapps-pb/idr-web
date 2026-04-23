import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import { type DeleteForageAvailabilityUseCase } from '../../../domain/use-cases/forage-availability-use-cases'

export class RemoteDeleteForageAvailabilityUseCase
  implements DeleteForageAvailabilityUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: DeleteForageAvailabilityUseCase['execute'] = async ({
    propertyId,
    id,
  }) => {
    const { statusCode } = await this.httpClient.request({
      url: `${this.url.replace(':propertyId', propertyId.toString())}/${id}`,
      method: 'delete',
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Disponibilidade de Forragem')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para excluir uma disponibilidade de forragem.'
      )
    }

    throw new UnexpectedError()
  }
}
