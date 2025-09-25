import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  AnimalSaleApiResponse,
  AnimalSaleModel,
} from '../../../domain/models/animal-sales-model'
import type { GetAnimalSalesUseCase } from '../../../domain/use-cases/animal-sales-use-cases'
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'

export class RemoteGetAnimalSalesUseCase implements GetAnimalSalesUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalSaleModel,
      AnimalSaleApiResponse,
      ListApiResponse<AnimalSaleModel[]>
    >
  ) {}

  execute: GetAnimalSalesUseCase['execute'] = async ({
    propertyId,
    animalId,
    filters,
    pagination,
    sort,
  }) => {
    const mapApiProperties: MapApiProperties<
      AnimalSaleModel,
      AnimalSaleApiResponse
    > = {
      id: 'id',
      date: 'date',
      destination: 'destination',
      reason: 'reason',
      price: 'price',
      weight: 'weight',
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
          return {
            id: item.id,
            date: new Date(item.date),
            destination: item.destination,
            reason: item.reason,
            price: item.price,
            weight: item.weight,
          }
        }),
        totalPages: Math.ceil(body.numberOfElements / body.pageable.pageSize),
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
