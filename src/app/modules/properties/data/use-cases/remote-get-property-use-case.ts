import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type { GetPropertyUseCase } from '../../domain/use-cases'

export class RemoteGetPropertyUseCase implements GetPropertyUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: GetPropertyUseCase['execute'] = async (id) => {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        ...body,
        localization: {
          ...body.localization,
          images: body.localization.images.map((image: string) => ({
            preview: image,
          })),
        },
      }
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Propriedades')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar uma propriedade'
      )
    }

    throw new UnexpectedError()
  }
}
