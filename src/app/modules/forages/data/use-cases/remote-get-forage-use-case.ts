import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  ForageOwnershipType,
  ForageDetailsModel,
} from '../../domain/models/forages-model'
import type { GetForageUseCase } from '../../domain/use-cases'

export class RemoteGetForageUseCase implements GetForageUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: GetForageUseCase['execute'] = async ({ forageId, propertyId }) => {
    const url = this.url.replace(':propertyId', propertyId)

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/${forageId}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        id: body.id,
        area: body.area,
        averageCost: body.averageCost,
        cultivation: body.cultivation,
        formation: new Date(body.formation),
        observation: body.observation,
        ownershipType: body.type as ForageOwnershipType,
        growthCycle: body.growthCycle,
        usefulLife: body.usefulLife,
      } as ForageDetailsModel
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Forrageira')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar uma forrageira'
      )
    }

    throw new UnexpectedError()
  }
}
