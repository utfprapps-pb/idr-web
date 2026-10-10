import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'

import type {
  BreedApiResponse,
  BreedModel,
} from '@/core/domain/models/breeds-model'
import type { Filters } from '@/core/domain/types'
import type { GetAllBreedsUseCase } from '@/core/domain/use-cases/breeds-use-cases'

export type BreedSearchApiResponse = {
  currentPage: number
  perPage: number
  total: number
  items: BreedApiResponse[]
}

function resolveTerms(filters?: Filters<BreedModel>): string | undefined {
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

export class RemoteGetAllBreedsUseCase implements GetAllBreedsUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      BreedModel,
      BreedApiResponse,
      BreedSearchApiResponse
    >
  ) {}

  execute: GetAllBreedsUseCase['execute'] = async ({ filters, pagination }) => {
    const params = new URLSearchParams({
      page: String((pagination?.page ?? 1) - 1),
      perPage: String(pagination?.perPage ?? 10),
    })

    const terms = resolveTerms(filters)
    if (terms) params.set('terms', terms)

    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/search?${params.toString()}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        resources: body.items.map((item) => ({
          id: item.id,
          name: item.breedName,
        })),
        totalPages: body.perPage > 0 ? Math.ceil(body.total / body.perPage) : 0,
      }
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError()
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Raças')
    }

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    throw new UnexpectedError()
  }
}
