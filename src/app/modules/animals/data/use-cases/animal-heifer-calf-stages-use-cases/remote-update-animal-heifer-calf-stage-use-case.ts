import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { UpdateAnimalHeiferCalfStageUseCase } from '../../../domain/use-cases/animal-heifer-calf-stages-use-cases'

export class RemoteUpdateAnimalHeiferCalfStageUseCase
  implements UpdateAnimalHeiferCalfStageUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: UpdateAnimalHeiferCalfStageUseCase['execute'] = async ({
    propertyId,
    animalId,
    animalHeiferCalfStage: { id, ...animalHeiferCalfStage },
  }) => {
    const url = this.url
      .replace(':propertyId', propertyId)
      .replace(':animalId', animalId)

    const { statusCode } = await this.httpClient.request({
      url: `${url}/${id}`,
      method: 'patch',
      body: animalHeiferCalfStage,
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para editar uma fase bezerra novilha'
      )
    }

    throw new UnexpectedError()
  }
}
