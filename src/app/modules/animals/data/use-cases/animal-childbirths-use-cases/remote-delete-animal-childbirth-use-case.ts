import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type { DeleteAnimalChildbirthUseCase } from '../../../domain/use-cases/animal-childbirths-use-cases'

export class RemoteDeleteAnimalChildbirthUseCase
  implements DeleteAnimalChildbirthUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: DeleteAnimalChildbirthUseCase['execute'] = async ({
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
