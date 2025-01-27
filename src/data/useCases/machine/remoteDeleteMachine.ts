import { type IHttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, NotFoundError, ForbiddenError } from '@/domain/errors'

import type { IDeleteMachine } from '@/domain/useCases/machine'

export class RemoteDeleteMachine implements IDeleteMachine {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpClient
  ) {}

  execute: IDeleteMachine['execute'] = async ({ propertyId, machineId }) => {
    const url = this.url.replace(':propertyId', propertyId)

    const { statusCode } = await this.httpClient.request({
      url: `${url}/${machineId}`,
      method: 'delete',
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Máquina')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para excluir uma máquina'
      )
    }

    throw new UnexpectedError()
  }
}
