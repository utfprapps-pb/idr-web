import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { paginateData, sortData } from '@/core/mocks/utils'

import allBreedsData from '@database/allBreedsData.json'

import type { BreedApiResponse } from '@/core/domain/models/breeds-model'

export type BreedSearchApiResponse = {
  currentPage: number
  perPage: number
  total: number
  items: BreedApiResponse[]
}

export const getAllBreedsHandler = httpWithMiddleware<PathParams, never, never>(
  {
    routePath: '/api/breeds/search',
    method: 'get',
    middlewares: [withDelay(), withAuth],
    resolver: async ({ request }) => {
      const url = new URL(request.url)
      const terms = url.searchParams.get('terms') ?? ''
      const page = Number(url.searchParams.get('page') ?? 0)
      const perPage = Number(url.searchParams.get('perPage') ?? 10)
      const sort = url.searchParams.get('sort')
      const direction = url.searchParams.get('direction') ?? 'asc'

      let breeds: BreedApiResponse[] = allBreedsData

      if (terms) {
        breeds = breeds.filter((item) =>
          Object.values(item).some((value) =>
            String(value).toLowerCase().includes(terms.toLowerCase())
          )
        )
      }

      if (sort) {
        breeds = sortData(
          {
            field: sort as keyof BreedApiResponse,
            type: direction as 'asc' | 'desc',
          },
          breeds
        )
      }

      const total = breeds.length
      const items = paginateData({ page, perPage }, breeds)

      const response: BreedSearchApiResponse = {
        currentPage: page,
        perPage,
        total,
        items,
      }

      return HttpResponse.json(response, { status: HttpStatusCode.ok })
    },
  }
)
