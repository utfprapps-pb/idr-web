import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'
import { BreedModel } from '@/core/domain/models/breed-model'

import type { GetAllBreedsUseCase } from '@/core/domain/use-cases/breeds-use-cases'

export class RemoteGetAllBreedsUseCase implements GetAllBreedsUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<BreedModel, BreedModel>
  ) {}

  execute: GetAllBreedsUseCase['execute'] = async () => {
    const { statusCode, body } = await this.httpClient.request({
      url: this.url,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return body.content.map((item) => ({
        value: item.id,
        label: item.name,
      }))
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError()
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Raças')
    }

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    throw new UnexpectedError()
  }
}
