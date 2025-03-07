import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type { DeleteImprovementUseCase } from '../../domain/use-cases'

export class RemoteDeleteImprovementUseCase
  implements DeleteImprovementUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: DeleteImprovementUseCase['execute'] = async ({
    propertyId,
    improvementId,
  }) => {
    const url = this.url.replace(':propertyId', propertyId)

    const { statusCode } = await this.httpClient.request({
      url: `${url}/${improvementId}`,
      method: 'delete',
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Benfeitoria')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para excluir uma benfeitoria'
      )
    }

    throw new UnexpectedError()
  }
}
