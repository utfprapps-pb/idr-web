import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { UpdateAnimalChildBirthUseCase } from '../../domain/use-cases'

export class RemoteUpdateAnimalChildBirthUseCase
  implements UpdateAnimalChildBirthUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: UpdateAnimalChildBirthUseCase['execute'] = async ({
    propertyId,
    animalChildBirth: { id, ...animalChildBirth },
  }) => {
    const url = this.url.replace(':propertyId', propertyId).replace(':id', id)

    const { statusCode } = await this.httpClient.request({
      url,
      method: 'patch',
      body: animalChildBirth,
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para editar um parto do animal'
      )
    }

    throw new UnexpectedError()
  }
}
