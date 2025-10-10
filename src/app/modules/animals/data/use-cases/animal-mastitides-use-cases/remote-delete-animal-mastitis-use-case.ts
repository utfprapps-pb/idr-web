import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type { DeleteAnimalMastitisUseCase } from '../../../domain/use-cases/animal-mastitides-use-cases'

export class RemoteDeleteAnimalMastitisUseCase
  implements DeleteAnimalMastitisUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: DeleteAnimalMastitisUseCase['execute'] = async ({
    propertyId,
    animalId,
    id,
  }) => {
    const url = this.url
      .replace(':propertyId', String(propertyId))
      .replace(':animalId', String(animalId))

    const { statusCode } = await this.httpClient.request({
      url: `${url}/${id}`,
      method: 'delete',
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Mastite do Animal')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para excluir a mastite deste animal'
      )
    }

    throw new UnexpectedError()
  }
}
