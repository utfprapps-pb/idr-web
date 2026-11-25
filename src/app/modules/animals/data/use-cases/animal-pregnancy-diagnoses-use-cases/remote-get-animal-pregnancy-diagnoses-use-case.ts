import { buildSearchQuery, toTotalPages } from '@/core/data/helpers'
import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import { fromApi } from '../../mappers/animal-pregnancy-diagnosis-api-mapper'

import type {
  AnimalPregnancyDiagnosisModel,
  AnimalPregnancyDiagnosisApiResponse,
} from '../../../domain/models/animal-pregnancy-diagnoses-model'
import type { GetAnimalPregnancyDiagnosesUseCase } from '../../../domain/use-cases/animal-pregnancy-diagnoses-use-cases'
import type { MapApiProperties, SearchApiResponse } from '@/core/domain/types'

/**
 * Coluna da tabela -> campo da entidade na API (o `sort` do Spring usa o nome
 * da entidade). Coluna fora do mapa não envia `sort`.
 */
const SORT_FIELD_MAP: MapApiProperties<
  AnimalPregnancyDiagnosisModel,
  AnimalPregnancyDiagnosisApiResponse
> = {
  date: 'diagnoseDate',
  lastInseminationDate: 'lastIa',
}

export class RemoteGetAnimalPregnancyDiagnosesUseCase
  implements GetAnimalPregnancyDiagnosesUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalPregnancyDiagnosisModel,
      AnimalPregnancyDiagnosisApiResponse,
      SearchApiResponse<AnimalPregnancyDiagnosisApiResponse>
    >
  ) {}

  execute: GetAnimalPregnancyDiagnosesUseCase['execute'] = async ({
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
      (field) => SORT_FIELD_MAP[field as keyof AnimalPregnancyDiagnosisModel]
    )

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/search?${query}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        resources: body.items.map((item) => {
          const { date, lastInseminationDate } = fromApi(item)

          return { id: item.id, date, lastInseminationDate }
        }),
        totalPages: toTotalPages(body),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Diagnósticos de Gestação do Animal')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar os diagnósticos de gestação do animal'
      )
    }

    throw new UnexpectedError()
  }
}
