import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { filterData, paginateData } from '@/core/mocks/utils'

import producersData from '@database/producersData.json'

type ProducerApiResponse = { id: string; name: string }

export const searchProducersHandler = httpWithMiddleware<never, never, never>({
  routePath: '/api/v1/producers/search',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const url = new URL(request.url)
    const terms = url.searchParams.get('terms') ?? ''
    const page = Number(url.searchParams.get('page') ?? 0)
    const perPage = Number(url.searchParams.get('perPage') ?? 10)

    const filtered = filterData<ProducerApiResponse>(
      [{ field: 'name', value: terms, type: 'LIKE' }],
      producersData
    )

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
