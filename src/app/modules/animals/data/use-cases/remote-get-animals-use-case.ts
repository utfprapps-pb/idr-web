import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import type { 
  AnimalApiResponse, 
  AnimalModel,
} from '../../domain/models/animals-model'
import type { GetAnimalsUseCase } from '../../domain/use-cases'
import { MapApiProperties } from '@/core/domain/types'

export class RemoteGetAnimalsUseCase implements GetAnimalsUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<AnimalModel, AnimalApiResponse>
  ) {}

  execute: GetAnimalsUseCase['execute'] = async ({
      filters,
      pagination,
      sort,
    },
    { 
      propertyId,
    },
) => {
    this.url.replace(':propertyId', propertyId)
  
    const mapApiProperties: MapApiProperties<
      AnimalModel,
      AnimalApiResponse
    > = {
      name: 'name',
    }

    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/search`,
      method: 'post',
      filters,
      pagination,
      sort,
      mapApiProperties,
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        resources: body.content.map((item) => ({
          propertyId: '1',
          id: String(item.id),
          name: 'aaa',
          breed: item.breed,
        })),
        totalPages: Math.ceil(body.numberOfElements / body.pageable.pageSize),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Animais')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError('Você não tem permissão para buscar os animais')
    }

    throw new UnexpectedError()
  }
}
