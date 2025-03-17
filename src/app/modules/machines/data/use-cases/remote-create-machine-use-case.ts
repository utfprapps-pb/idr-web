import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { CreateMachineUseCase } from '../../domain/use-cases'

export class RemoteCreateMachineUseCase implements CreateMachineUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: CreateMachineUseCase['execute'] = async ({
    propertyId,
    machine,
  }) => {
    const url = this.url.replace(':propertyId', propertyId)

    const { statusCode } = await this.httpClient.request({
      url,
      method: 'post',
      body: machine,
    })

    if (statusCode === HttpStatusCode.created) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para criar uma nova máquina'
      )
    }

    throw new UnexpectedError()
  }
}
