import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  AnimalMastitisApiResponse,
  AnimalMastitisCmtResults,
  AnimalMastitisModel,
  AnimalMastitisType,
} from '../../../domain/models/animal-mastitides-model'
import type { GetAnimalMastitidesUseCase } from '../../../domain/use-cases/animal-mastitides-use-cases'
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'

export class RemoteGetAnimalMastitidesUseCase
  implements GetAnimalMastitidesUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalMastitisModel,
      AnimalMastitisApiResponse,
      ListApiResponse<AnimalMastitisModel[]>
    >
  ) {}

  execute: GetAnimalMastitidesUseCase['execute'] = async ({
    propertyId,
    animalId,
    filters,
    pagination,
    sort,
  }) => {
    const mapApiProperties: MapApiProperties<
      AnimalMastitisModel,
      AnimalMastitisApiResponse
    > = {
      id: 'id',
      date: 'date',
      type: 'type',
      ad: 'ad',
      ae: 'ae',
      pd: 'pd',
      pe: 'pe',
    }

    const url = this.url
      .replace(':propertyId', String(propertyId))
      .replace(':animalId', String(animalId))

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/search`,
      method: 'post',
      filters,
      pagination,
      sort,
      mapApiProperties,
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        resources: body.content.map((item) => {
          const typeMapper: Record<AnimalMastitisType, string> = {
            CLINICAL: 'Clínica',
            SUBCLINICAL: 'Sub-clínica',
          }

          const conditionMapper: Record<AnimalMastitisCmtResults, string> = {
            'PLUS-ONE': '+',
            'PLUS-TWO': '++',
            'PLUS-THREE': '+++',
            ABSENT: 'Ausente',
          }

          return {
            id: item.id,
            date: new Date(item.date),
            type: typeMapper[item.type] as AnimalMastitisType,
            ad: conditionMapper[item.ad] as AnimalMastitisCmtResults,
            ae: conditionMapper[item.ae] as AnimalMastitisCmtResults,
            pd: conditionMapper[item.pd] as AnimalMastitisCmtResults,
            pe: conditionMapper[item.pe] as AnimalMastitisCmtResults,
          }
        }),
        totalPages: Math.ceil(body.numberOfElements / body.pageable.pageSize),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Mastites do Animal')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar as mastites do animal'
      )
    }

    throw new UnexpectedError()
  }
}
