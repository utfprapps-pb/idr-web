import { type IHttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, NotFoundError, ForbiddenError } from '@/domain/errors'

import type {
  PerennialForageDetailsModel,
  PerennialForageType,
} from '@/domain/models/perennialForageModel'
import type { IGetPerennialForage } from '@/domain/useCases/perennialForage'

export class RemoteGetOne implements IGetPerennialForage {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpClient
  ) {}

  execute: IGetPerennialForage['execute'] = async ({
    perennialForageId,
    propertyId,
  }) => {
    const url = this.url.replace(':propertyId', propertyId)

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/${perennialForageId}`,
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
        type: body.type as PerennialForageType,
        usefulLife: body.usefulLife,
      } as PerennialForageDetailsModel
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Forrageira perene')

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar uma forrageira perene'
      )
    }

    throw new UnexpectedError()
  }
}
