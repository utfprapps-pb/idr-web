import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'
import { ITEMS_PER_PAGE } from '@/core/infra/http'

import type { ForageModel } from '../../domain/models/forages-model'
import type { GetForagesUseCase } from '../../domain/use-cases'

export class RemoteGetForagesUseCase implements GetForagesUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  execute: GetForagesUseCase['execute'] = async ({
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
      const ownershipType = {
        OWNED_LAND: 'Terra Própria',
        LEASED_LAND: 'Terra Arrendada',
      }

      const growthCycle = {
        ANNUAL: 'Anual',
        PERENNIAL: 'Perene',
      }

      return {
        resources: body.forages.map(
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
              ownershipType:
                ownershipType[item.type as keyof typeof ownershipType],
              growthCycle:
                growthCycle[item.growthCycle as keyof typeof growthCycle],
              usefulLife: item.usefulLife,
            }) as ForageModel
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
