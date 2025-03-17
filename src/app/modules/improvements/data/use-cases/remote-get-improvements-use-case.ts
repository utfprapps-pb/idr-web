import { format } from 'date-fns'

import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'
import { ITEMS_PER_PAGE } from '@/core/infra/http'

import type { ImprovementModel } from '../../domain/models/improvements-model'
import type { GetImprovementsUseCase } from '../../domain/use-cases'

export class RemoteGetImprovementsUseCase implements GetImprovementsUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: GetImprovementsUseCase['execute'] = async ({
    propertyId,
    queryParams: { filters, pagination, sort },
  }) => {
    const url = this.url.replace(':propertyId', propertyId)

    const { statusCode, body } = await this.httpClient.request({
      url,
      method: 'get',
      filters,
      pagination,
      sort,
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        resources: body.improvements.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item: any) =>
            ({
              id: item.id,
              description: item.description,
              amount: String(item.amount),
              unitPrice: `R$ ${item.unitPrice}`,
              percentDairyCattle: `${item.percentDairyCattle}%`,
              usefulLife: String(item.usefulLife),
              acquisitionDate: format(
                new Date(item.acquisitionDate),
                'dd/MM/yyyy'
              ),
              moneyDairyCattle: `R$ ${item.moneyDairyCattle}`,
            }) as ImprovementModel
        ),
        totalPages: Math.ceil(body.totalRegisters / ITEMS_PER_PAGE),
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
