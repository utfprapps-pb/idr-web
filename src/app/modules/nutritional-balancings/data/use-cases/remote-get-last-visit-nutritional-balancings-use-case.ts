import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import { UnexpectedError, ForbiddenError } from '@/core/domain/errors'

import type {
  NutritionalBalancingDetailsApiResponse,
  NutritionalBalancingDetailsModel,
} from '../../domain/models/nutritional-balancings-model'
import type { GetLastVisitNutritionalBalancingsUseCase } from '../../domain/use-cases'

type LastVisitApiResponse = {
  visitId: number
  nutritionalBalancings: NutritionalBalancingDetailsApiResponse[]
}

export class RemoteGetLastVisitNutritionalBalancingsUseCase
  implements GetLastVisitNutritionalBalancingsUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      {
        visitId: number
        nutritionalBalancings: NutritionalBalancingDetailsModel[]
      },
      LastVisitApiResponse
    >
  ) {}

  execute: GetLastVisitNutritionalBalancingsUseCase['execute'] = async ({
    propertyId,
  }) => {
    const url = this.url.replace(':propertyId', String(propertyId))

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/last-visit`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        visitId: body.visitId,
        nutritionalBalancings: body.nutritionalBalancings.map(
          (nutritional) => ({
            date: new Date(nutritional.date),
            visitId: nutritional.visitId,
            animal: nutritional.animal,
            summary: nutritional.summary,
            evaluations: nutritional.evaluations,
            ingredientGroups: nutritional.ingredientGroups,
          })
        ),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      return null
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar balanceamentos nutricionais'
      )
    }

    throw new UnexpectedError()
  }
}
