import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { paginateData } from '@/core/mocks/utils'

import citiesData from '@database/citiesData.json'

import type { CityApiResponse } from '@/core/domain/models/city-model'

export const getCitiesHandler = httpWithMiddleware<never, never, never>({
  routePath: '/api/v1/cities',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const url = new URL(request.url)
    const terms = url.searchParams.get('terms') ?? ''
    const page = Number(url.searchParams.get('page') ?? 0)
    const perPage = Number(url.searchParams.get('perPage') ?? 10)

    const filtered = terms
      ? (citiesData as CityApiResponse[]).filter((city) =>
          city.name.toLowerCase().includes(terms.toLowerCase())
        )
      : (citiesData as CityApiResponse[])

    const items = paginateData({ page, perPage }, filtered)

    return HttpResponse.json(
      {
        currentPage: page,
        perPage,
        total: filtered.length,
        items,
      },
      { status: HttpStatusCode.ok }
    )
  },
})
