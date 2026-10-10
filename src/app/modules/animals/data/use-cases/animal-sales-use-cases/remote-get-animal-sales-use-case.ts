import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import { fromApi } from '../../mappers/animal-sale-api-mapper'

import type {
  AnimalSaleDestination,
  AnimalSaleModel,
  AnimalSaleReason,
} from '../../../domain/models/animal-sales-model'
import type { GetAnimalSalesUseCase } from '../../../domain/use-cases/animal-sales-use-cases'
import type { Filters } from '@/core/domain/types'

export type AnimalSaleSearchApiItem = {
  id: string
  dateSale: string
  value: number
  destination: string
  reason: string
}

export type AnimalSaleSearchApiResponse = {
  currentPage: number
  perPage: number
  total: number
  items: AnimalSaleSearchApiItem[]
}

const SORT_FIELD_MAP: Record<string, string> = {
  date: 'dateSale',
  price: 'value',
  destination: 'destination',
  reason: 'reason',
}

function resolveTerms(filters?: Filters<AnimalSaleModel>): string | undefined {
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

export class RemoteGetAnimalSalesUseCase implements GetAnimalSalesUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalSaleModel,
      AnimalSaleSearchApiItem,
      AnimalSaleSearchApiResponse
    >
  ) {}

  execute: GetAnimalSalesUseCase['execute'] = async ({
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
      const reasonMapper: Record<AnimalSaleReason, string> = {
        VOLUNTARY: 'Voluntário',
        DISCARD: 'Descarte',
        EMERGENCY: 'Emergência',
      }

      const destinationMapper: Record<AnimalSaleDestination, string> = {
        SLAUGHTER: 'Abate',
        PRODUCTION: 'Produção',
      }

      return {
        resources: body.items.map((item) => {
          const { date, price, destination, reason } = fromApi(item)

          return {
            id: item.id,
            date,
            destination: destinationMapper[destination],
            reason: reasonMapper[reason],
            price,
            weight: '',
          }
        }),
        totalPages: body.perPage > 0 ? Math.ceil(body.total / body.perPage) : 0,
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Vendas do Animal')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar as vendas do animal'
      )
    }

    throw new UnexpectedError()
  }
}
