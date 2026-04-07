import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { CreateInputUseLocationUseCase } from '../../../domain/use-cases/input-use-locations-use-cases'

export class RemoteCreateInputUseLocationUseCase
  implements CreateInputUseLocationUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: CreateInputUseLocationUseCase['execute'] = async ({
    inputUseLocation,
  }) => {
    const { statusCode } = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: inputUseLocation,
    })

    if (statusCode === HttpStatusCode.created) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para criar um local de utilização.'
      )
    }

    throw new UnexpectedError()
  }
}
