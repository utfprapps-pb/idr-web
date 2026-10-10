import { buildSearchQuery, toTotalPages } from '@/core/data/helpers'
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
  AnimalSaleApiResponse,
} from '../../../domain/models/animal-sales-model'
import type { GetAnimalSalesUseCase } from '../../../domain/use-cases/animal-sales-use-cases'
import type { SearchApiResponse } from '@/core/domain/types'

const SORT_FIELD_MAP: Record<string, string> = {
  date: 'dateSale',
  price: 'value',
  destination: 'destination',
  reason: 'reason',
}

export class RemoteGetAnimalSalesUseCase implements GetAnimalSalesUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalSaleModel,
      AnimalSaleApiResponse,
      SearchApiResponse<AnimalSaleApiResponse>
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

    const query = buildSearchQuery(
      { filters, pagination, sort },
      (field) => SORT_FIELD_MAP[field] ?? field
    )

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/search?${query}`,
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
          const { date, price, destination, reason, weight } = fromApi(item)

          return {
            id: item.id,
            date,
            destination: destinationMapper[destination],
            reason: reasonMapper[reason],
            price,
            weight,
          }
        }),
        totalPages: toTotalPages(body),
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
