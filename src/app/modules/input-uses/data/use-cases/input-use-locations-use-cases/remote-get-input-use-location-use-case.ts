import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'

import type {
  InputUseLocationDetailsApiResponse,
  InputUseLocationDetailsModel,
} from '../../../domain/models/input-use-locations-model'
import type { GetInputUseLocationUseCase } from '../../../domain/use-cases/input-use-locations-use-cases'

export class RemoteGetInputUseLocationUseCase
  implements GetInputUseLocationUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      InputUseLocationDetailsModel,
      InputUseLocationDetailsApiResponse
    >
  ) {}

  execute: GetInputUseLocationUseCase['execute'] = async ({ id }) => {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body)
      return {
        description: body.description,
      }

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Local de Utilização')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para acessar os dados deste local de utilização.'
      )
    }

    throw new UnexpectedError()
  }
}
