import { buildSearchQuery, toTotalPages } from '@/core/data/helpers'
import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import { fromApi } from '../../mappers/animal-purchase-api-mapper'

import type {
  AnimalPurchaseModel,
  AnimalPurchaseApiResponse,
} from '../../../domain/models/animal-purchases-model'
import type { GetAnimalPurchasesUseCase } from '../../../domain/use-cases/animal-purchases-use-cases'
import type { SearchApiResponse } from '@/core/domain/types'

const SORT_FIELD_MAP: Record<string, string> = {
  date: 'datePurchase',
  birthDate: 'birthDate',
  price: 'value',
}

export class RemoteGetAnimalPurchasesUseCase
  implements GetAnimalPurchasesUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalPurchaseModel,
      AnimalPurchaseApiResponse,
      SearchApiResponse<AnimalPurchaseApiResponse>
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

    const query = buildSearchQuery(
      { filters, pagination, sort },
      (field) => SORT_FIELD_MAP[field] ?? field
    )

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/search?${query}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        resources: body.items.map((item) => {
          const { date, birthDate, price, weight } = fromApi(item)

          return { id: item.id, date, birthDate, price, weight }
        }),
        totalPages: toTotalPages(body),
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
