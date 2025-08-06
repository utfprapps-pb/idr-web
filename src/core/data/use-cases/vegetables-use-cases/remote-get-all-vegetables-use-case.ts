import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { VegetableApiResponse } from '@/core/domain/models/vegetables-model'
import type {
  ListApiResponse,
  MapApiProperties,
  Option,
} from '@/core/domain/types'
import type { GetAllVegetablesUseCase } from '@/core/domain/use-cases/vegetables-use-cases'

export class RemoteGetAllVegetablesUseCase implements GetAllVegetablesUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      Option,
      VegetableApiResponse,
      ListApiResponse<VegetableApiResponse[]>
    >
  ) {}

  execute: GetAllVegetablesUseCase['execute'] = async ({ filters }) => {
    const mapApiProperties: MapApiProperties<Option, VegetableApiResponse> = {
      value: 'id',
      label: 'cultureName',
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
          value: item.id,
          label: item.cultureName,
        })),
        totalPages: Math.ceil(body.numberOfElements / body.pageable.pageSize),
      }
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError()
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Vegetais')
    }

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    throw new UnexpectedError()
  }
}
