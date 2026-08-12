import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { filterData, paginateData } from '@/core/mocks/utils'

import propertiesData from '@database/propertiesData.json'

type PropertyApiResponse = { id: number; name: string }

export const getPropertiesHandler = httpWithMiddleware<never, never, never>({
  routePath: '/api/v1/properties/search',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const url = new URL(request.url)
    const terms = url.searchParams.get('terms') ?? ''
    const page = Number(url.searchParams.get('page') ?? 0)
    const perPage = Number(url.searchParams.get('perPage') ?? 10)

    const filtered = filterData<PropertyApiResponse>(
      [{ field: 'name', value: terms, type: 'LIKE' }],
      propertiesData
    )

    const items = paginateData({ page, perPage }, filtered).map((p) => ({
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
