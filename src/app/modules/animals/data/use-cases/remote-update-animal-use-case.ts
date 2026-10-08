import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { AnimalWriteApiRequest } from '../../domain/models/animals-model'
import type { UpdateAnimalUseCase } from '../../domain/use-cases'

export class RemoteUpdateAnimalUseCase implements UpdateAnimalUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: UpdateAnimalUseCase['execute'] = async ({
    propertyId,
    animal: { id, ...animal },
  }) => {
    const url = this.url.replace(':propertyId', String(propertyId))

    const body: AnimalWriteApiRequest = {
      propertyId,
      identifier: animal.name,
      breed: { id: animal.breed.value },
    }

    const { statusCode } = await this.httpClient.request({
      url: `${url}/${id}`,
      method: 'patch',
      body,
    })

    if (statusCode === HttpStatusCode.ok) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError('Você não tem permissão para editar um animal')
    }

    throw new UnexpectedError()
  }
}
