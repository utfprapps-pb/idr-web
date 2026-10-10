import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import { toApi } from '../../mappers/animal-death-api-mapper'

import type { UpdateAnimalDeathUseCase } from '../../../domain/use-cases/animal-deaths-use-cases'

export class RemoteUpdateAnimalDeathUseCase
  implements UpdateAnimalDeathUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: UpdateAnimalDeathUseCase['execute'] = async ({
    propertyId,
    animalId,
    animalDeath: { id, ...animalDeath },
  }) => {
    const url = this.url
      .replace(':propertyId', String(propertyId))
      .replace(':animalId', String(animalId))

    const { statusCode } = await this.httpClient.request({
      url: `${url}/${id}`,
      method: 'put',
      body: toApi(animalDeath),
    })

    if (statusCode === HttpStatusCode.ok) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para editar o óbito do animal'
      )
    }

    throw new UnexpectedError()
  }
}
