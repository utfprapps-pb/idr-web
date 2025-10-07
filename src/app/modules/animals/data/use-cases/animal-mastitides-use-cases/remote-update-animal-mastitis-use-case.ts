import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { UpdateAnimalMastitisUseCase } from '../../../domain/use-cases/animal-mastitides-use-cases'

export class RemoteUpdateAnimalMastitisUseCase
  implements UpdateAnimalMastitisUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: UpdateAnimalMastitisUseCase['execute'] = async ({
    propertyId,
    animalId,
    animalMastitis: { id, ...animalMastitis },
  }) => {
    const url = this.url
      .replace(':propertyId', String(propertyId))
      .replace(':animalId', String(animalId))

    const { statusCode } = await this.httpClient.request({
      url: `${url}/${id}`,
      method: 'patch',
      body: animalMastitis,
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para editar uma mastite do animal'
      )
    }

    throw new UnexpectedError()
  }
}
