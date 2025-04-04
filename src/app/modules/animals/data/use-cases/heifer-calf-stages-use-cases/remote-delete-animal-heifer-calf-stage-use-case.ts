import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type { DeleteAnimalHeiferCalfStageUseCase } from '../../../domain/use-cases/animal-heifer-calf-stages-use-cases'

export class RemoteDeleteAnimalHeiferCalfStageUseCase
  implements DeleteAnimalHeiferCalfStageUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: DeleteAnimalHeiferCalfStageUseCase['execute'] = async ({
    propertyId,
    animalId,
    id,
  }) => {
    const url = this.url
      .replace(':propertyId', propertyId)
      .replace(':animalId', animalId)

    const { statusCode } = await this.httpClient.request({
      url: `${url}/${id}`,
      method: 'delete',
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Fase bezerra novilha')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para excluir a fase bezerra novilha'
      )
    }

    throw new UnexpectedError()
  }
}
