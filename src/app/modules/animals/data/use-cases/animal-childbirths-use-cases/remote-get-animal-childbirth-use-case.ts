import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import { fromApi } from '../../mappers/animal-childbirth-api-mapper'

import type {
  AnimalChildbirthDetailsModel,
  AnimalChildbirthApiResponse,
} from '../../../domain/models/animal-childbirths-model'
import type { GetAnimalChildbirthUseCase } from '../../../domain/use-cases/animal-childbirths-use-cases'

export class RemoteGetAnimalChildbirthUseCase
  implements GetAnimalChildbirthUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalChildbirthDetailsModel,
      AnimalChildbirthApiResponse
    >
  ) {}

  execute: GetAnimalChildbirthUseCase['execute'] = async ({
    id,
    animalId,
    propertyId,
  }) => {
    const url = this.url
      .replace(':propertyId', String(propertyId))
      .replace(':animalId', String(animalId))

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/${id}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return fromApi(body)
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Parto do Animal')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar um parto do animal'
      )
    }

    throw new UnexpectedError()
  }
}
