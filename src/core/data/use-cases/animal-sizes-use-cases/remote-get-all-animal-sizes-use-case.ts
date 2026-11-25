import { buildSearchQuery, toTotalPages } from '@/core/data/helpers'
import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'

import type {
  AnimalSizeApiResponse,
  AnimalSizeModel,
} from '@/core/domain/models/animal-sizes-model'
import type { SearchApiResponse } from '@/core/domain/types'
import type { GetAllAnimalSizesUseCase } from '@/core/domain/use-cases/animal-sizes-use-cases'

export class RemoteGetAllAnimalSizesUseCase
  implements GetAllAnimalSizesUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalSizeModel,
      AnimalSizeApiResponse,
      SearchApiResponse<AnimalSizeApiResponse>
    >
  ) {}

  execute: GetAllAnimalSizesUseCase['execute'] = async ({
    filters,
    pagination,
  }) => {
    const query = buildSearchQuery({ filters, pagination })

    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/search?${query}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        resources: body.items.map((item) => ({
          id: item.id,
          name: item.sizeName,
        })),
        totalPages: toTotalPages(body),
      }
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError()
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Portes')
    }

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    throw new UnexpectedError()
  }
}
