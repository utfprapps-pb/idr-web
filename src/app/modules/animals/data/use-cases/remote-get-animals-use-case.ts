import { buildSearchQuery, toTotalPages } from '@/core/data/helpers'
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
import type { MapApiProperties, SearchApiResponse } from '@/core/domain/types'

export class RemoteGetAnimalsUseCase implements GetAnimalsUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalModel,
      AnimalApiResponse,
      SearchApiResponse<AnimalApiResponse>
    >
  ) {}

  execute: GetAnimalsUseCase['execute'] = async ({
    propertyId,
    filters,
    pagination,
    sort,
  }) => {
    // `breedName` vem na resposta, mas não é coluna do animal no backend —
    // ordenar por raça usa `breedId` (agrupa, mas não em ordem alfabética).
    const mapApiProperties: MapApiProperties<AnimalModel, AnimalApiResponse> = {
      id: 'id',
      name: 'identifier',
      breed: 'breedId',
      ecc: 'ecc',
      weight: 'currentWeight',
    }

    const url = this.url.replace(':propertyId', String(propertyId))

    const query = buildSearchQuery(
      { filters, pagination, sort },
      (field) => mapApiProperties[field as keyof AnimalModel]
    )

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/search?${query}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        resources: body.items.map((item) => ({
          id: item.id,
          name: item.identifier,
          breed: item.breedName ?? '',
          weight: item.currentWeight != null ? String(item.currentWeight) : '',
          ecc: item.ecc != null ? String(item.ecc) : '',
          milkProduction: '',
        })),
        totalPages: toTotalPages(body),
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
