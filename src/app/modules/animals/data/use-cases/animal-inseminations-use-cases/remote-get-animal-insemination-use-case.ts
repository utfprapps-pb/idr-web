import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  AnimalInseminationDetailsModel,
  AnimalInseminationDetailsApiResponse,
} from '../../../domain/models/animal-inseminations-model'
import type { GetAnimalInseminationUseCase } from '../../../domain/use-cases/animal-inseminations-use-cases'

export class RemoteGetAnimalInseminationUseCase
  implements GetAnimalInseminationUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalInseminationDetailsModel,
      AnimalInseminationDetailsApiResponse
    >
  ) {}

  execute: GetAnimalInseminationUseCase['execute'] = async ({
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
      return {
        date: new Date(body.date),
        sire: body.sire,
      }
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Inseminação do Animal')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar inseminação deste animal.'
      )
    }

    throw new UnexpectedError()
  }
}
