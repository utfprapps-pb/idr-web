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
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'
import type { GetAllBreedsUseCase } from '@/core/domain/use-cases/breeds-use-cases'

export class RemoteGetAllBreedsUseCase implements GetAllBreedsUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      BreedModel,
      BreedApiResponse,
      ListApiResponse<BreedApiResponse[]>
    >
  ) {}

  execute: GetAllBreedsUseCase['execute'] = async ({ filters }) => {
    const mapApiProperties: MapApiProperties<BreedModel, BreedApiResponse> = {
      id: 'id',
      name: 'breedName',
    }

    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/search`,
      method: 'post',
      filters,
      mapApiProperties,
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        resources: body.content.map((item) => ({
          id: item.id,
          name: item.breedName,
        })),
        totalPages: Math.ceil(body.numberOfElements / body.pageable.pageSize),
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
