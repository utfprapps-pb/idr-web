import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type { DeleteGeneralCultivationPestUseCase } from '../../../domain/use-cases/general-cultivation-pests-use-cases'

export class RemoteDeleteGeneralCultivationPestUseCase
  implements DeleteGeneralCultivationPestUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: DeleteGeneralCultivationPestUseCase['execute'] = async ({ id }) => {
    const { statusCode } = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'delete',
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Praga de Cultivo Geral')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para excluir uma praga de cultivo geral.'
      )
    }

    throw new UnexpectedError()
  }
}
