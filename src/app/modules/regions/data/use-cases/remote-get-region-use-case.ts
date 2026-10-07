import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  RegionDetailsApiResponse,
  RegionDetailsModel,
} from '../../domain/models/regions-model'
import type { GetRegionUseCase } from '../../domain/use-cases'

export class RemoteGetRegionUseCase implements GetRegionUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      RegionDetailsModel,
      RegionDetailsApiResponse
    >
  ) {}

  execute: GetRegionUseCase['execute'] = async (id) => {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        name: (body as unknown as { description: string }).description,
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Região')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError('Você não tem permissão para buscar a região')
    }

    throw new UnexpectedError()
  }
}
