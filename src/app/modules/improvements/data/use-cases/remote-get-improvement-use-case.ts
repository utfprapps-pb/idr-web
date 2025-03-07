import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type { ImprovementDetailsModel } from '../../domain/models/improvements-model'
import type { GetImprovementUseCase } from '../../domain/use-cases'

export class RemoteGetImprovementUseCase implements GetImprovementUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: GetImprovementUseCase['execute'] = async ({
    improvementId,
    propertyId,
  }) => {
    const url = this.url.replace(':propertyId', propertyId)

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/${improvementId}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        description: body.description,
        amount: String(body.amount),
        unitPrice: String(body.unitPrice),
        percentDairyCattle: String(body.percentDairyCattle),
        usefulLife: String(body.usefulLife),
        acquisitionDate: new Date(body.acquisitionDate),
        moneyDairyCattle: String(body.moneyDairyCattle),
      } as ImprovementDetailsModel
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
