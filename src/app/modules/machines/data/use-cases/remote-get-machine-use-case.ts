import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type { MachineDetailsModel } from '../../domain/models/machines-model'
import type { GetMachineUseCase } from '../../domain/use-cases'

export class RemoteGetMachineUseCase implements GetMachineUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: GetMachineUseCase['execute'] = async ({ machineId, propertyId }) => {
    const url = this.url.replace(':propertyId', propertyId)

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/${machineId}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        name: body.name,
        amount: String(body.amount),
        unitPrice: String(body.unitPrice),
        percentDairyCattle: String(body.percentDairyCattle),
        usefulLife: String(body.usefulLife),
        acquisitionDate: new Date(body.acquisitionDate),
        moneyDairyCattle: String(body.moneyDairyCattle),
      } as MachineDetailsModel
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Máquina')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError('Você não tem permissão para buscar uma máquina')
    }

    throw new UnexpectedError()
  }
}
