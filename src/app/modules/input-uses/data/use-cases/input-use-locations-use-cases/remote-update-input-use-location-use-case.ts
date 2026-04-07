import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { UpdateInputUseLocationUseCase } from '../../../domain/use-cases/input-use-locations-use-cases'

export class RemoteUpdateInputUseLocationUseCase
  implements UpdateInputUseLocationUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: UpdateInputUseLocationUseCase['execute'] = async ({
    inputUseLocation: { id, ...inputUseLocation },
  }) => {
    const { statusCode } = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'patch',
      body: inputUseLocation,
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para editar um local de utilização.'
      )
    }

    throw new UnexpectedError()
  }
}
