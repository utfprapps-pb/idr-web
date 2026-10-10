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
import type { Filters } from '@/core/domain/types'

export type AnimalMastitisSearchApiItem = AnimalMastitisApiRecord & {
  id: string
}

export type AnimalMastitisSearchApiResponse = {
  currentPage: number
  perPage: number
  total: number
  items: AnimalMastitisSearchApiItem[]
}

const SORT_FIELD_MAP: Record<string, string> = {
  date: 'diagnoseDate',
  type: 'mastitisType',
  ad: 'ad',
  ae: 'ae',
  pd: 'pd',
  pe: 'pe',
}

function resolveTerms(
  filters?: Filters<AnimalMastitisModel>
): string | undefined {
  if (!filters) return undefined

  const filterEntry = Object.values(filters).find(
    (filter) => filter !== undefined
  ) as { value: unknown } | undefined

  if (!filterEntry) return undefined

  const { value } = filterEntry

  if (value instanceof Date) return value.toISOString()
  if (Array.isArray(value)) return value.map(String).join(',')

  return String(value)
}

export class RemoteGetAnimalMastitidesUseCase
  implements GetAnimalMastitidesUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalMastitisModel,
      AnimalMastitisSearchApiItem,
      AnimalMastitisSearchApiResponse
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

    const params = new URLSearchParams({
      page: String((pagination?.page ?? 1) - 1),
      perPage: String(pagination?.perPage ?? 10),
    })

    const terms = resolveTerms(filters)
    if (terms) params.set('terms', terms)

    if (sort) {
      params.set(
        'sort',
        SORT_FIELD_MAP[String(sort.field)] ?? String(sort.field)
      )
      params.set('direction', sort.direction)
    }

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/search?${params.toString()}`,
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
        totalPages: body.perPage > 0 ? Math.ceil(body.total / body.perPage) : 0,
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
