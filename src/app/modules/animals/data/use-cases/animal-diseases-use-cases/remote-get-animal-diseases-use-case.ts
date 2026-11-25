import { buildSearchQuery, toTotalPages } from '@/core/data/helpers'
import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import { fromApi } from '../../mappers/animal-disease-api-mapper'

import type {
  AnimalDiseaseModel,
  AnimalDiseaseApiResponse,
} from '../../../domain/models/animal-diseases-model'
import type { GetAnimalDiseasesUseCase } from '../../../domain/use-cases/animal-diseases-use-cases'
import type { MapApiProperties, SearchApiResponse } from '@/core/domain/types'

/**
 * Coluna da tabela -> campo da entidade na API (o `sort` do Spring usa o nome
 * da entidade). Coluna fora do mapa não envia `sort`.
 */
const SORT_FIELD_MAP: MapApiProperties<
  AnimalDiseaseModel,
  AnimalDiseaseApiResponse
> = {
  diagnostic: 'diagnosis',
  diagnosticDate: 'diagnosisDate',
}

export class RemoteGetAnimalDiseasesUseCase
  implements GetAnimalDiseasesUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalDiseaseModel,
      AnimalDiseaseApiResponse,
      SearchApiResponse<AnimalDiseaseApiResponse>
    >
  ) {}

  execute: GetAnimalDiseasesUseCase['execute'] = async ({
    propertyId,
    animalId,
    filters,
    pagination,
    sort,
  }) => {
    const url = this.url
      .replace(':propertyId', String(propertyId))
      .replace(':animalId', String(animalId))

    const query = buildSearchQuery(
      { filters, pagination, sort },
      (field) => SORT_FIELD_MAP[field as keyof AnimalDiseaseModel]
    )

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/search?${query}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        resources: body.items.map((item) => {
          const { diagnostic, diagnosticDate } = fromApi(item)

          return { id: item.id, diagnostic, diagnosticDate }
        }),
        totalPages: toTotalPages(body),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Doenças do Animal')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar as doenças do animal'
      )
    }

    throw new UnexpectedError()
  }
}
