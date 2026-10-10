import { buildSearchQuery, toTotalPages } from '@/core/data/helpers'
import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import {
  fromApi,
  type AnimalMastitisApiRecord,
} from '../../mappers/animal-mastitis-api-mapper'

import type {
  AnimalMastitisCmtResults,
  AnimalMastitisModel,
  AnimalMastitisType,
} from '../../../domain/models/animal-mastitides-model'
import type { GetAnimalMastitidesUseCase } from '../../../domain/use-cases/animal-mastitides-use-cases'
import type { SearchApiResponse } from '@/core/domain/types'

export type AnimalMastitisSearchApiItem = AnimalMastitisApiRecord & {
  id: string
}

const SORT_FIELD_MAP: Record<string, string> = {
  date: 'diagnoseDate',
  type: 'mastitisType',
  ad: 'ad',
  ae: 'ae',
  pd: 'pd',
  pe: 'pe',
}

export class RemoteGetAnimalMastitidesUseCase
  implements GetAnimalMastitidesUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalMastitisModel,
      AnimalMastitisSearchApiItem,
      SearchApiResponse<AnimalMastitisSearchApiItem>
    >
  ) {}

  execute: GetAnimalMastitidesUseCase['execute'] = async ({
    propertyId,
    animalId,
    filters,
    pagination,
    sort,
  }) => {
    const url = this.url
      .replace(':propertyId', String(propertyId))
      .replace(':animalId', String(animalId))

    const query = buildSearchQuery(
      { filters, pagination, sort },
      (field) => SORT_FIELD_MAP[field] ?? field
    )

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/search?${query}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      const typeMapper: Record<AnimalMastitisType, string> = {
        CLINICAL: 'Clínica',
        SUBCLINICAL: 'Subclínica',
      }

      const conditionMapper: Record<AnimalMastitisCmtResults, string> = {
        'PLUS-ONE': '+',
        'PLUS-TWO': '++',
        'PLUS-THREE': '+++',
        ABSENT: 'Ausente',
      }

      return {
        resources: body.items.map((item) => {
          const { date, type, ad, ae, pd, pe } = fromApi(item)

          return {
            id: item.id,
            date,
            type: typeMapper[type] as AnimalMastitisType,
            ad: conditionMapper[ad] as AnimalMastitisCmtResults,
            ae: conditionMapper[ae] as AnimalMastitisCmtResults,
            pd: conditionMapper[pd] as AnimalMastitisCmtResults,
            pe: conditionMapper[pe] as AnimalMastitisCmtResults,
          }
        }),
        totalPages: toTotalPages(body),
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
