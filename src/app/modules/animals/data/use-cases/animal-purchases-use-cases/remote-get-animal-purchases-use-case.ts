import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import { fromApi } from '../../mappers/animal-purchase-api-mapper'

import type { AnimalPurchaseModel } from '../../../domain/models/animal-purchases-model'
import type { GetAnimalPurchasesUseCase } from '../../../domain/use-cases/animal-purchases-use-cases'
import type { Filters } from '@/core/domain/types'

export type AnimalPurchaseSearchApiItem = {
  id: string
  datePurchase: string
  birthDate: string
  value: number
}

export type AnimalPurchaseSearchApiResponse = {
  currentPage: number
  perPage: number
  total: number
  items: AnimalPurchaseSearchApiItem[]
}

const SORT_FIELD_MAP: Record<string, string> = {
  date: 'datePurchase',
  birthDate: 'birthDate',
  price: 'value',
}

function resolveTerms(
  filters?: Filters<AnimalPurchaseModel>
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

export class RemoteGetAnimalPurchasesUseCase
  implements GetAnimalPurchasesUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalPurchaseModel,
      AnimalPurchaseSearchApiItem,
      AnimalPurchaseSearchApiResponse
    >
  ) {}

  execute: GetAnimalPurchasesUseCase['execute'] = async ({
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
      return {
        resources: body.items.map((item) => {
          const { date, birthDate, price, weight } = fromApi(item)

          return { id: item.id, date, birthDate, price, weight }
        }),
        totalPages: body.perPage > 0 ? Math.ceil(body.total / body.perPage) : 0,
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Compras do Animal')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar as compras do animal'
      )
    }

    throw new UnexpectedError()
  }
}
