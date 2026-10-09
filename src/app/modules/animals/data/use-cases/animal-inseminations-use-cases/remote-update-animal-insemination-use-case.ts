import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import { toApi } from '../../mappers/animal-insemination-api-mapper'

import type { UpdateAnimalInseminationUseCase } from '../../../domain/use-cases/animal-inseminations-use-cases'

export class RemoteUpdateAnimalInseminationUseCase
  implements UpdateAnimalInseminationUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: UpdateAnimalInseminationUseCase['execute'] = async ({
    propertyId,
    animalId,
    animalInsemination: { id, ...animalInsemination },
  }) => {
    const url = this.url
      .replace(':propertyId', String(propertyId))
      .replace(':animalId', String(animalId))

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/${id}`,
      method: 'put',
      body: toApi(animalInsemination),
    })

    if (statusCode === HttpStatusCode.ok && !!body) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para editar esta inseminação do animal.'
      )
    }

    throw new UnexpectedError()
  }
}
