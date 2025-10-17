import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type { DeleteGeneralCultivationDiseaseUseCase } from '../../../domain/use-cases/general-cultivation-diseases-use-cases'

export class RemoteDeleteGeneralCultivationDiseaseUseCase
  implements DeleteGeneralCultivationDiseaseUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: DeleteGeneralCultivationDiseaseUseCase['execute'] = async ({
    id,
  }) => {
    const { statusCode } = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'delete',
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Doença de Cultivo Geral')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para excluir uma doença geral de cultivo.'
      )
    }

    throw new UnexpectedError()
  }
}
