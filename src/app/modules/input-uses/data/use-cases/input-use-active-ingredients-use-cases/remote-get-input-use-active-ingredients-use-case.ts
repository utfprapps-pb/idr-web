import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  InputUseActiveIngredientApiResponse,
  InputUseActiveIngredientModel,
} from '../../../domain/models/input-use-active-ingredients-model'
import type { GetInputUseActiveIngredientsUseCase } from '../../../domain/use-cases/input-use-active-ingredients-use-cases'
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'

export class RemoteGetInputUseActiveIngredientsUseCase
  implements GetInputUseActiveIngredientsUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      InputUseActiveIngredientModel,
      InputUseActiveIngredientApiResponse,
      ListApiResponse<InputUseActiveIngredientApiResponse[]>
    >
  ) {}

  execute: GetInputUseActiveIngredientsUseCase['execute'] = async ({
    filters,
    pagination,
    sort,
  }) => {
    const mapApiProperties: MapApiProperties<
      InputUseActiveIngredientModel,
      InputUseActiveIngredientApiResponse
    > = {
      id: 'id',
      name: 'name',
    }

    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/search`,
      method: 'post',
      filters,
      pagination,
      sort,
      mapApiProperties,
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        resources: body.content.map((item) => {
          return {
            id: item.id,
            name: item.name,
          }
        }),
        totalPages: Math.ceil(body.numberOfElements / body.pageable.pageSize),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Princípio Ativo')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar os princípios ativos.'
      )
    }

    throw new UnexpectedError()
  }
}
