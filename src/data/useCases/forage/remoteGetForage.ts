import { type IHttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, NotFoundError, ForbiddenError } from '@/domain/errors'

import type {
  ForageDetailsModel,
  ForageOwnershipType,
} from '@/domain/models/forageModel'
import type { IGetForage } from '@/domain/useCases/forage'

export class RemoteGetForage implements IGetForage {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpClient
  ) {}

  execute: IGetForage['execute'] = async ({ forageId, propertyId }) => {
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
