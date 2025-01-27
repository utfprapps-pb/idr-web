import { format } from 'date-fns'

import { type IHttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, NotFoundError, ForbiddenError } from '@/domain/errors'
import { ITEMS_PER_PAGE } from '@/infra/http'

import type { MachineModel } from '@/domain/models/machineModel'
import type { IGetMachines } from '@/domain/useCases/machine'

export class RemoteGetMachines implements IGetMachines {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpClient
  ) {}

  execute: IGetMachines['execute'] = async ({
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
        resources: body.machines.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item: any) =>
            ({
              id: item.id,
              name: item.name,
              amount: String(item.amount),
              unitPrice: `R$ ${item.unitPrice}`,
              percentDairyCattle: `${item.percentDairyCattle}%`,
              usefulLife: String(item.usefulLife),
              acquisitionDate: format(
                new Date(item.acquisitionDate),
                'dd/MM/yyyy'
              ),
              moneyDairyCattle: `R$ ${item.moneyDairyCattle}`,
            }) as MachineModel
        ),
        totalPages: Math.ceil(body.totalRegisters / ITEMS_PER_PAGE),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Máquinas')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError('Você não tem permissão para buscar máquinas')
    }

    throw new UnexpectedError()
  }
}
