import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type {
  CityApiResponse,
  CityDetailsModel,
} from '../../domain/models/cities-model'
import type { GetCityUseCase } from '../../domain/use-cases'

export class RemoteGetCityUseCase implements GetCityUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<CityDetailsModel, CityApiResponse>
  ) {}

  execute: GetCityUseCase['execute'] = async (id) => {
    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/${id}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        name: body.name,
        state: body.state,
        regionId: body.region.id,
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Cidade')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError('Você não tem permissão para buscar a cidade')
    }

    throw new UnexpectedError()
  }
}
