import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { paginateData } from '@/core/mocks/utils'

import regionsData from '@database/regionsData.json'

import type { RegionModel } from '@/core/domain/models/region-model'

export const searchRegionsHandler = httpWithMiddleware<never, never, never>({
  routePath: '/api/v1/regions/search',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const url = new URL(request.url)
    const terms = url.searchParams.get('terms') ?? ''
    const page = Number(url.searchParams.get('page') ?? 0)
    const perPage = Number(url.searchParams.get('perPage') ?? 10)

    const filtered = terms
      ? (regionsData as RegionModel[]).filter((r) =>
          r.description.toLowerCase().includes(terms.toLowerCase())
        )
      : (regionsData as RegionModel[])

    const items = paginateData({ page, perPage }, filtered)

    return HttpResponse.json(
      { currentPage: page, perPage, total: filtered.length, items },
      { status: HttpStatusCode.ok }
    )
  },
})
