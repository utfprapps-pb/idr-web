import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import propertiesData from '@database/propertiesData.json'

export const getPropertiesHandler = httpWithMiddleware<never, never, never>({
  routePath: '/api/v1/properties/search',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const url = new URL(request.url)
    const terms = url.searchParams.get('terms') ?? ''
    const page = Number(url.searchParams.get('page') ?? 0)
    const perPage = Number(url.searchParams.get('perPage') ?? 10)

    const filtered = terms
      ? propertiesData.filter((p) =>
          p.name.toLowerCase().includes(terms.toLowerCase())
        )
      : propertiesData

    const start = page * perPage
    const items = filtered.slice(start, start + perPage).map((p) => ({
      id: String(p.id),
      name: p.name,
      producerId: '',
      cityId: '',
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
