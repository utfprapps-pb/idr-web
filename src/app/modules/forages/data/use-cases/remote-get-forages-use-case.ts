import { format } from 'date-fns'

import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  ForageApiResponse,
  ForageGrowthCycle,
  ForageModel,
  ForageOwnershipType,
} from '../../domain/models/forages-model'
import type { GetForagesUseCase } from '../../domain/use-cases'
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'

export class RemoteGetForagesUseCase implements GetForagesUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      ForageModel,
      ForageApiResponse,
      ListApiResponse<ForageApiResponse[]>
    >
  ) {}

  execute: GetForagesUseCase['execute'] = async ({
    propertyId,
    filters,
    pagination,
    sort,
  }) => {
    const mapApiProperties: MapApiProperties<ForageModel, ForageApiResponse> = {
      id: 'id',
      area: 'area',
      averageCost: 'averageCost',
      cultivation: 'cultivation',
      formation: 'formation',
      observation: 'observation',
      ownershipType: 'ownershipType',
      growthCycle: 'growthCycle',
      usefulLife: 'usefulLife',
    }

    const url = this.url.replace(':propertyId', String(propertyId))

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/search`,
      method: 'post',
      filters,
      pagination,
      sort,
      mapApiProperties,
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      const ownershipType: Record<ForageOwnershipType, string> = {
        OWNED_LAND: 'Terra Própria',
        LEASED_LAND: 'Terra Arrendada',
      }

      const growthCycle: Record<ForageGrowthCycle, string> = {
        ANNUAL: 'Anual',
        PERENNIAL: 'Perene',
      }

      return {
        resources: body.content.map((item) => ({
          id: item.id,
          area: item.area,
          averageCost: item.averageCost,
          cultivation: item.cultivation,
          formation: format(new Date(item.formation), 'dd/MM/yyyy'),
          observation: item.observation,
          ownershipType: ownershipType[item.ownershipType],
          growthCycle: growthCycle[item.growthCycle],
          usefulLife: item.usefulLife,
        })),
        totalPages: Math.ceil(body.numberOfElements / body.pageable.pageSize),
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
