import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import regionsData from '@database/regionsData.json'

type RegionItem = { id: string; description: string }

export const getRegionsHandler = httpWithMiddleware<never, never, never>({
  routePath: '/api/v1/regions/search',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const url = new URL(request.url)
    const terms = url.searchParams.get('terms') ?? ''
    const page = Number(url.searchParams.get('page') ?? 0)
    const perPage = Number(url.searchParams.get('perPage') ?? 10)

    let regions = regionsData as RegionItem[]

    if (terms) {
      regions = regions.filter((r) =>
        r.description.toLowerCase().includes(terms.toLowerCase())
      )
    }

    const start = page * perPage
    const items = regions.slice(start, start + perPage)

    return HttpResponse.json(
      { currentPage: page, perPage, total: regions.length, items },
      { status: HttpStatusCode.ok }
    )
  },
})
