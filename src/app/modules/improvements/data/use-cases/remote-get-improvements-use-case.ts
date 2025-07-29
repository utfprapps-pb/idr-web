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
      description: 'description',
      amount: 'amount',
      unitPrice: 'unitPrice',
      percentDairyCattle: 'percentDairyCattle',
      usefulLife: 'usefulLife',
      acquisitionDate: 'acquisitionDate',
      moneyDairyCattle: 'moneyDairyCattle',
    }

    const url = this.url.replace(':propertyId', propertyId)

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
          description: item.description,
          amount: String(item.amount),
          unitPrice: `R$ ${item.unitPrice}`,
          percentDairyCattle: `${item.percentDairyCattle}%`,
          usefulLife: String(item.usefulLife),
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
