import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type { DeleteVegetableDiseaseUseCase } from '../../../domain/use-cases/vegetable-diseases-use-cases'

export class RemoteDeleteVegetableDiseaseUseCase
  implements DeleteVegetableDiseaseUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: DeleteVegetableDiseaseUseCase['execute'] = async ({
    propertyId,
    id,
  }) => {
    const url = this.url.replace(':propertyId', String(propertyId))

    const { statusCode } = await this.httpClient.request({
      url: `${url}/${id}`,
      method: 'delete',
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Doença do Vegetal')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para excluir a doença deste vegetal'
      )
    }

    throw new UnexpectedError()
  }
}
