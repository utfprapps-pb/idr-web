import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { paginateData } from '@/core/mocks/utils'

import producersData from '@database/producersData.json'

export const searchProducersHandler = httpWithMiddleware<never, never, never>({
  routePath: '/api/v1/producers/search',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const url = new URL(request.url)
    const terms = url.searchParams.get('terms') ?? ''
    const page = Number(url.searchParams.get('page') ?? 0)
    const perPage = Number(url.searchParams.get('perPage') ?? 10)

    const filtered = terms
      ? producersData.filter((p) =>
          p.name.toLowerCase().includes(terms.toLowerCase())
        )
      : producersData

    const items = paginateData({ page, perPage }, filtered).map((p) => ({
      id: String(p.id),
      name: p.name,
    }))

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
