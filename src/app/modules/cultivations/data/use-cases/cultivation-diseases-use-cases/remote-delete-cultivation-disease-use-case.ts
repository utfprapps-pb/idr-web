import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type { DeleteCultivationDiseaseUseCase } from '../../../domain/use-cases/cultivation-diseases-use-cases'

export class RemoteDeleteCultivationDiseaseUseCase
  implements DeleteCultivationDiseaseUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: DeleteCultivationDiseaseUseCase['execute'] = async ({
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
      throw new NotFoundError('Doença do Cultivo')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para excluir a doença deste cultivo'
      )
    }

    throw new UnexpectedError()
  }
}
