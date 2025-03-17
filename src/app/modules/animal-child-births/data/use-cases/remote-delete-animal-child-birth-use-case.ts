import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type { DeleteAnimalChildBirthUseCase } from '../../domain/use-cases'

export class RemoteDeleteAnimalChildBirthUseCase
  implements DeleteAnimalChildBirthUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: DeleteAnimalChildBirthUseCase['execute'] = async ({
    propertyId,
    animalChildBirthId,
  }) => {
    const url = this.url
      .replace(':propertyId', propertyId)
      .replace(':animalChildBirthId', animalChildBirthId)

    const { statusCode } = await this.httpClient.request({
      url,
      method: 'delete',
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Parto do Animal')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para excluir o parto deste animal'
      )
    }

    throw new UnexpectedError()
  }
}
