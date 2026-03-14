import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  AnimalApiResponse,
  AnimalModel,
} from '../../domain/models/animals-model'
import type { GetAllAnimalsUseCase } from '../../domain/use-cases'

export class RemoteGetAllAnimalsUseCase implements GetAllAnimalsUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalModel,
      AnimalApiResponse,
      AnimalApiResponse[]
    >
  ) {}

  execute: GetAllAnimalsUseCase['execute'] = async ({ propertyId }) => {
    const url = this.url.replace(':propertyId', String(propertyId))

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/all`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body?.length) {
      return body.map((item) => ({
        id: item.id,
        name: item.name,
        breed: item.breed,
        weight: item.weight,
        ecc: item.ecc,
        milkProduction: item.milkProduction,
      }))
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Animais')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError('Você não tem permissão para buscar os animais')
    }

    throw new UnexpectedError()
  }
}
