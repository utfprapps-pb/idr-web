import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'

import type {
  ActiveIngredientApiResponse,
  ActiveIngredientModel,
} from '@/core/domain/models/active-ingredients-model'
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'
import type { GetAllActiveIngredientsUseCase } from '@/core/domain/use-cases/active-ingredients-use-cases'

export class RemoteGetAllActiveIngredientsUseCase
  implements GetAllActiveIngredientsUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      ActiveIngredientModel,
      ActiveIngredientApiResponse,
      ListApiResponse<ActiveIngredientApiResponse[]>
    >
  ) {}

  execute: GetAllActiveIngredientsUseCase['execute'] = async ({ filters }) => {
    const mapApiProperties: MapApiProperties<
      ActiveIngredientModel,
      ActiveIngredientApiResponse
    > = {
      id: 'id',
      name: 'name',
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
          name: item.name,
        })),
        totalPages: Math.ceil(body.numberOfElements / body.pageable.pageSize),
      }
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError()
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Princípios Ativos')
    }

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    throw new UnexpectedError()
  }
}
