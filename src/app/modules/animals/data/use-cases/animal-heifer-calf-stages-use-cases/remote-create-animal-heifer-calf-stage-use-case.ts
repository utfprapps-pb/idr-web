import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { CreateAnimalHeiferCalfStageUseCase } from '../../../domain/use-cases/animal-heifer-calf-stages-use-cases'

export class RemoteCreateAnimalHeiferCalfStageUseCase
  implements CreateAnimalHeiferCalfStageUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: CreateAnimalHeiferCalfStageUseCase['execute'] = async ({
    propertyId,
    animalId,
    animalHeiferCalfStage,
  }) => {
    const url = this.url
      .replace(':propertyId', propertyId)
      .replace(':animalId', animalId)

    const { statusCode } = await this.httpClient.request({
      url,
      method: 'post',
      body: animalHeiferCalfStage,
    })

    if (statusCode === HttpStatusCode.created) return

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para criar um novo registro em fase bezerra novilha'
      )
    }

    throw new UnexpectedError()
  }
}
