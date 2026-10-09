import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  UnexpectedError,
  NotFoundError,
  ForbiddenError,
} from '@/core/domain/errors'

import { fromApi } from '../../mappers/animal-insemination-api-mapper'

import type { AnimalInseminationModel } from '../../../domain/models/animal-inseminations-model'
import type { GetAnimalInseminationsUseCase } from '../../../domain/use-cases/animal-inseminations-use-cases'
import type { Filters } from '@/core/domain/types'

export type AnimalInseminationSearchApiItem = {
  id: string
  iaDate: string
  bull: string
}

export type AnimalInseminationSearchApiResponse = {
  currentPage: number
  perPage: number
  total: number
  items: AnimalInseminationSearchApiItem[]
}

function resolveTerms(
  filters?: Filters<AnimalInseminationModel>
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

export class RemoteGetAnimalInseminationsUseCase
  implements GetAnimalInseminationsUseCase
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AnimalInseminationModel,
      AnimalInseminationSearchApiItem,
      AnimalInseminationSearchApiResponse
    >
  ) {}

  execute: GetAnimalInseminationsUseCase['execute'] = async ({
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
      const SORT_FIELD_MAP: Record<string, string> = {
        sire: 'bull',
        date: 'iaDate',
      }
      const sortField = SORT_FIELD_MAP[String(sort.field)] ?? String(sort.field)
      params.set('sort', sortField)
      params.set('direction', sort.direction)
    }

    const { statusCode, body } = await this.httpClient.request({
      url: `${url}/search?${params.toString()}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        resources: body.items.map((item) => {
          const { date, sire } = fromApi(item)

          return { id: item.id, date, sire }
        }),
        totalPages: Math.ceil(body.total / body.perPage),
      }
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Inseminações do Animal')
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError(
        'Você não tem permissão para buscar inseminações deste animal.'
      )
    }

    throw new UnexpectedError()
  }
}
