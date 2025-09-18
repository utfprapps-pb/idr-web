import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  ImprovementDetailsApiResponse,
  ImprovementDetailsModel,
} from '../../domain/models/improvements-model'
import type { GetImprovementUseCase } from '../../domain/use-cases'

export class RemoteGetImprovementUseCase implements GetImprovementUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      ImprovementDetailsModel,
      ImprovementDetailsApiResponse
    >
  ) {}

  execute: GetImprovementUseCase['execute'] = async ({
    improvementId,
    propertyId,
  }) => {
    const url = this.url.replace(':propertyId', String(propertyId))

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/${improvementId}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        type: body.type,
        name: body.name,
        amount: String(body.amount),
        unitPrice: String(body.unitPrice),
        percentDairyCattle: String(body.percentDairyCattle),
        lifespan: String(body.lifespan),
        acquisitionDate: new Date(body.acquisitionDate),
        moneyDairyCattle: String(body.moneyDairyCattle),
      }
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Benfeitoria')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar uma benfeitoria'
      )
    }

    throw new UnexpectedError()
  }
}
