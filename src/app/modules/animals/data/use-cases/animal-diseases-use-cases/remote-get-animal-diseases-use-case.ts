import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import { fromApi } from '../../mappers/animal-disease-api-mapper'

import type { AnimalDiseaseModel } from '../../../domain/models/animal-diseases-model'
import type { GetAnimalDiseasesUseCase } from '../../../domain/use-cases/animal-diseases-use-cases'
import type { Filters } from '@/core/domain/types'

export type AnimalDiseaseSearchApiItem = {
  id: string
  diagnosis: string
  diagnosisDate: string
}

export type AnimalDiseaseSearchApiResponse = {
  currentPage: number
  perPage: number
  total: number
  items: AnimalDiseaseSearchApiItem[]
}

const SORT_FIELD_MAP: Record<string, string> = {
  diagnostic: 'diagnosis',
  diagnosticDate: 'diagnosisDate',
}

function resolveTerms(
  filters?: Filters<AnimalDiseaseModel>
): string | undefined {
  if (!filters) return undefined

  const filterEntry = Object.values(filters).find(
    (filter) => filter !== undefined
  ) as { value: unknown } | undefined

  if (!filterEntry) return undefined

  const { value } = filterEntry

  if (value instanceof Date) return value.toISOString()
  if (Array.isArray(value)) return value.map(String).join(',')

  return String(value)
}

export class RemoteGetAnimalDiseasesUseCase
  implements GetAnimalDiseasesUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalDiseaseModel,
      AnimalDiseaseSearchApiItem,
      AnimalDiseaseSearchApiResponse
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

    const params = new URLSearchParams({
      page: String((pagination?.page ?? 1) - 1),
      perPage: String(pagination?.perPage ?? 10),
    })

    const terms = resolveTerms(filters)
    if (terms) params.set('terms', terms)

    if (sort) {
      params.set(
        'sort',
        SORT_FIELD_MAP[String(sort.field)] ?? String(sort.field)
      )
      params.set('direction', sort.direction)
    }

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/search?${params.toString()}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        resources: body.items.map((item) => {
          const { diagnostic, diagnosticDate } = fromApi(item)

          return { id: item.id, diagnostic, diagnosticDate }
        }),
        totalPages: Math.ceil(body.total / body.perPage),
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
