import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  ForageDetailsModel,
  ForageDetailsApiResponse,
} from '../../domain/models/forages-model'
import type { GetForageUseCase } from '../../domain/use-cases'

export class RemoteGetForageUseCase implements GetForageUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      ForageDetailsModel,
      ForageDetailsApiResponse
    >
  ) {}

  execute: GetForageUseCase['execute'] = async ({ forageId, propertyId }) => {
    const url = this.url.replace(':propertyId', String(propertyId))

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/${forageId}/details`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        type: body.type, // Ensure this property exists in the API response
        area: body.area,
        averageCost: body.averageCost,
        formation: body.formation ? new Date(body.formation) : null, // <--- RETORNA Date OU null
        cultivation: body.cultivation || '', // <--- RETORNA string OU string vazia
        observation: body.observation,
        ownershipType: body.ownershipType,
        growthCycle: body.growthCycle,
        usefulLife: body.usefulLife,
      }
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
