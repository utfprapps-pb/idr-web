import { format } from 'date-fns'

import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  ImprovementApiResponse,
  ImprovementModel,
} from '../../domain/models/improvements-model'
import type { GetImprovementsUseCase } from '../../domain/use-cases'
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'

export class RemoteGetImprovementsUseCase implements GetImprovementsUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      ImprovementModel,
      ImprovementApiResponse,
      ListApiResponse<ImprovementApiResponse[]>
    >
  ) {}

  execute: GetImprovementsUseCase['execute'] = async ({
    propertyId,
    filters,
    pagination,
    sort,
  }) => {
    const mapApiProperties: MapApiProperties<
      ImprovementModel,
      ImprovementApiResponse
    > = {
      id: 'id',
      type: 'type',
      name: 'name',
      amount: 'amount',
      unitPrice: 'unitPrice',
      percentDairyCattle: 'percentDairyCattle',
      lifespan: 'lifespan',
      acquisitionDate: 'acquisitionDate',
      moneyDairyCattle: 'moneyDairyCattle',
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
          type: item.type,
          name: item.name,
          amount: String(item.amount),
          unitPrice: `R$ ${item.unitPrice}`,
          percentDairyCattle: `${item.percentDairyCattle}%`,
          lifespan: String(item.lifespan),
          acquisitionDate: format(new Date(item.acquisitionDate), 'dd/MM/yyyy'),
          moneyDairyCattle: `R$ ${item.moneyDairyCattle}`,
        })),
        totalPages: Math.ceil(body.numberOfElements / body.pageable.pageSize),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Benfeitorias')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar benfeitorias'
      )
    }

    throw new UnexpectedError()
  }
}
