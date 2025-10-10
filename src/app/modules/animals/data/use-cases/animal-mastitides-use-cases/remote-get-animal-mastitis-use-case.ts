import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  AnimalMastitisCmtResults,
  AnimalMastitisDetailsApiResponse,
  AnimalMastitisDetailsModel,
  AnimalMastitisType,
} from '../../../domain/models/animal-mastitides-model'
import type { GetAnimalMastitisUseCase } from '../../../domain/use-cases/animal-mastitides-use-cases'

export class RemoteGetAnimalMastitisUseCase
  implements GetAnimalMastitisUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalMastitisDetailsModel,
      AnimalMastitisDetailsApiResponse
    >
  ) {}

  execute: GetAnimalMastitisUseCase['execute'] = async ({
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
        type: body.type as AnimalMastitisType,
        ad: body.ad as AnimalMastitisCmtResults,
        ae: body.ae as AnimalMastitisCmtResults,
        pd: body.pd as AnimalMastitisCmtResults,
        pe: body.pe as AnimalMastitisCmtResults,
      }
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Mastite do Animal')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar uma mastite do animal'
      )
    }

    throw new UnexpectedError()
  }
}
