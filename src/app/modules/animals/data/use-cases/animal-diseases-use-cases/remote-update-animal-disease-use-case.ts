import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import { toApi } from '../../mappers/animal-disease-api-mapper'

import type { UpdateAnimalDiseaseUseCase } from '../../../domain/use-cases/animal-diseases-use-cases'

export class RemoteUpdateAnimalDiseaseUseCase
  implements UpdateAnimalDiseaseUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: UpdateAnimalDiseaseUseCase['execute'] = async ({
    propertyId,
    animalId,
    animalDisease: { id, ...animalDisease },
  }) => {
    const url = this.url
      .replace(':propertyId', String(propertyId))
      .replace(':animalId', String(animalId))

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/${id}`,
      method: 'put',
      body: toApi(animalDisease),
    })

    if (statusCode === HttpStatusCode.ok && !!body) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para editar uma doença do animal'
      )
    }

    throw new UnexpectedError()
  }
}
