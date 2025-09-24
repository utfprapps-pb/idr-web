import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  AnimalPurchaseApiResponse,
  AnimalPurchaseModel,
} from '../../../domain/models/animal-purchases-model'
import type { GetAnimalPurchasesUseCase } from '../../../domain/use-cases/animal-purchases-use-cases'
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'

export class RemoteGetAnimalPurchasesUseCase
  implements GetAnimalPurchasesUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalPurchaseModel,
      AnimalPurchaseApiResponse,
      ListApiResponse<AnimalPurchaseModel[]>
    >
  ) {}

  execute: GetAnimalPurchasesUseCase['execute'] = async ({
    propertyId,
    animalId,
    filters,
    pagination,
    sort,
  }) => {
    const mapApiProperties: MapApiProperties<
      AnimalPurchaseModel,
      AnimalPurchaseApiResponse
    > = {
      id: 'id',
      date: 'date',
      birthDate: 'birthDate',
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
            birthDate: new Date(item.birthDate),
            price: item.price,
            weight: item.weight,
          }
        }),
        totalPages: Math.ceil(body.numberOfElements / body.pageable.pageSize),
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
