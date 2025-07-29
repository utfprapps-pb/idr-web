import { format } from 'date-fns'

import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  MachineApiResponse,
  MachineModel,
} from '../../domain/models/machines-model'
import type { GetMachinesUseCase } from '../../domain/use-cases'
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'

export class RemoteGetMachinesUseCase implements GetMachinesUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      MachineModel,
      MachineApiResponse,
      ListApiResponse<MachineApiResponse[]>
    >
  ) {}

  execute: GetMachinesUseCase['execute'] = async ({
    propertyId,
    filters,
    pagination,
    sort,
  }) => {
    const mapApiProperties: MapApiProperties<MachineModel, MachineApiResponse> =
      {
        id: 'id',
        name: 'name',
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
          name: item.name,
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
      throw new NotFoundError('Máquinas')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError('Você não tem permissão para buscar máquinas')
    }

    throw new UnexpectedError()
  }
}
