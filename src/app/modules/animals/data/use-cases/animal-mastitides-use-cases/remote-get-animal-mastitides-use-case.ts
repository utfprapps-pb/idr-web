import { buildSearchQuery, toTotalPages } from '@/core/data/helpers'
import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import { fromApi } from '../../mappers/animal-mastitis-api-mapper'

import type {
  AnimalMastitisCmtResults,
  AnimalMastitisModel,
  AnimalMastitisType,
  AnimalMastitisApiResponse,
} from '../../../domain/models/animal-mastitides-model'
import type { GetAnimalMastitidesUseCase } from '../../../domain/use-cases/animal-mastitides-use-cases'
import type { MapApiProperties, SearchApiResponse } from '@/core/domain/types'

/**
 * Coluna da tabela -> campo da entidade na API (o `sort` do Spring usa o nome
 * da entidade). Coluna fora do mapa não envia `sort`.
 */
const SORT_FIELD_MAP: MapApiProperties<
  AnimalMastitisModel,
  AnimalMastitisApiResponse
> = {
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
      AnimalMastitisApiResponse,
      SearchApiResponse<AnimalMastitisApiResponse>
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
      (field) => SORT_FIELD_MAP[field as keyof AnimalMastitisModel]
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
            type: (type ? typeMapper[type] : '') as AnimalMastitisType,
            ad: (ad ? conditionMapper[ad] : '') as AnimalMastitisCmtResults,
            ae: (ae ? conditionMapper[ae] : '') as AnimalMastitisCmtResults,
            pd: (pd ? conditionMapper[pd] : '') as AnimalMastitisCmtResults,
            pe: (pe ? conditionMapper[pe] : '') as AnimalMastitisCmtResults,
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
