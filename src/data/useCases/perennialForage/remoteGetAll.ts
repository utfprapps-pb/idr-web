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
    filters,
    pagination,
    sort,
  }) => {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}`,
      method: 'get',
      filters,
      pagination,
      sort,
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        resources: body.properties.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item: any) =>
            ({
              id: item.id,
              area: item.area,
              averageCost: item.averageCost,
              description: item.description,
              formation: new Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }).format(new Date(item.formation)),
              observation: item.observation,
              type: item.type,
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
