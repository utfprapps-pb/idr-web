import { buildSearchQuery, toTotalPages } from '@/core/data/helpers'
import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'

import type {
  BreedApiResponse,
  BreedModel,
} from '@/core/domain/models/breeds-model'
import type { SearchApiResponse } from '@/core/domain/types'
import type { GetAllBreedsUseCase } from '@/core/domain/use-cases/breeds-use-cases'

export class RemoteGetAllBreedsUseCase implements GetAllBreedsUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      BreedModel,
      BreedApiResponse,
      SearchApiResponse<BreedApiResponse>
    >
  ) {}

  execute: GetAllBreedsUseCase['execute'] = async ({ filters, pagination }) => {
    const query = buildSearchQuery({ filters, pagination })

    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/search?${query}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        resources: body.items.map((item) => ({
          id: item.id,
          name: item.breedName,
        })),
        totalPages: toTotalPages(body),
      }
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
