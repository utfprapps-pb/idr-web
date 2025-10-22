import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  NutritionalBalancingApiResponse,
  NutritionalBalancingModel,
} from '../../domain/models/nutritional-balancings-model'
import type { GetNutritionalBalancingsUseCase } from '../../domain/use-cases'
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'

export class RemoteGetNutritionalBalancingsUseCase
  implements GetNutritionalBalancingsUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      NutritionalBalancingModel,
      NutritionalBalancingApiResponse,
      ListApiResponse<NutritionalBalancingApiResponse[]>
    >
  ) {}

  execute: GetNutritionalBalancingsUseCase['execute'] = async ({
    propertyId,
    filters,
    pagination,
    sort,
  }) => {
    const mapApiProperties: MapApiProperties<
      NutritionalBalancingModel,
      NutritionalBalancingApiResponse
    > = {
      date: 'date',
      animal: 'animal',
      breed: 'breed',
      weight: 'weight',
      milkProduction: 'milkProduction',
      estimatedMilkProduction: 'estimatedMilkProduction',
    }

    const url = this.url.replace(':propertyId', String(propertyId))

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
        resources: body.content.map((item) => ({
          id: item.id,
          date: new Date(item.date),
          animal: item.animal,
          breed: item.breed,
          weight: item.weight,
          milkProduction: item.milkProduction,
          estimatedMilkProduction: item.estimatedMilkProduction,
        })),
        totalPages: Math.ceil(body.numberOfElements / body.pageable.pageSize),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Balanceamentos Nutricionais')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar os balanceamentos nutricionais'
      )
    }

    throw new UnexpectedError()
  }
}
