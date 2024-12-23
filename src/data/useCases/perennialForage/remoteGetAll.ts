import { type IHttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, NotFoundError, ForbiddenError } from '@/domain/errors'
import { ITEMS_PER_PAGE } from '@/infra/http'

import type { PerennialForageModel } from '@/domain/models/perennialForageModel'
import type { IGetPerennialForages } from '@/domain/useCases/perennialForage'

export class RemoteGetAll implements IGetPerennialForages {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpClient
  ) {}

  execute: IGetPerennialForages['execute'] = async ({
    propertyId,
    queryParams: { filters, pagination, sort },
  }) => {
    const url = this.url.replace(':propertyId', propertyId)

    const { statusCode, body } = await this.httpClient.request({
      url,
      method: 'get',
      filters,
      pagination,
      sort,
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      const types = {
        OWNED_LAND: 'Terra Própria',
        LEASED_LAND: 'Terra Arrendada',
      }

      return {
        resources: body.perennialForages.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item: any) =>
            ({
              id: item.id,
              area: item.area,
              averageCost: item.averageCost,
              cultivation: item.cultivation,
              formation: new Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }).format(new Date(item.formation)),
              observation: item.observation,
              type: types[item.type as keyof typeof types],
              usefulLife: item.usefulLife,
            }) as PerennialForageModel
        ),
        totalPages: Math.ceil(body.totalRegisters / ITEMS_PER_PAGE),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Propriedades')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar propriedades'
      )
    }

    throw new UnexpectedError()
  }
}
