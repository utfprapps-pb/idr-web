import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  NutritionalBalancingDetailsApiResponse,
  NutritionalBalancingDetailsModel,
} from '../../domain/models/nutritional-balancings-model'
import type { GetNutritionalBalancingUseCase } from '../../domain/use-cases'

export class RemoteGetNutritionalBalancingUseCase
  implements GetNutritionalBalancingUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      NutritionalBalancingDetailsModel,
      NutritionalBalancingDetailsApiResponse
    >
  ) {}

  execute: GetNutritionalBalancingUseCase['execute'] = async ({
    nutritionalBalancingId,
    propertyId,
  }) => {
    const url = this.url.replace(':propertyId', String(propertyId))

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/${nutritionalBalancingId}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        date: new Date(body.date),
        animal: body.animal,
        summary: body.summary,
        evaluations: body.evaluations,
        ingredientGroups: body.ingredientGroups,
      }
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Balanceamento Nutricional')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar um balanceamento nutricional'
      )
    }

    throw new UnexpectedError()
  }
}
