import { type IHttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, NotFoundError, ForbiddenError } from '@/domain/errors'

import type { IDeleteAnimal } from '@/domain/useCases/animal'

export class RemoteDeleteAnimal implements IDeleteAnimal {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpClient
  ) {}

  execute: IDeleteAnimal['execute'] = async ({ propertyId, animalId }) => {
    const url = this.url.replace(':propertyId', propertyId)

    const { statusCode } = await this.httpClient.request({
      url: `${url}/${animalId}`,
      method: 'delete',
    })

    if (statusCode === HttpStatusCode.noContent) return

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Animal')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError('Você não tem permissão para excluir um animal')
    }

    throw new UnexpectedError()
  }
}
