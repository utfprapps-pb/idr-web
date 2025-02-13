import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/data/protocols/http'
import { httpWithMiddleware } from '@/mocks/lib'
import { withAuth, withDelay } from '@/mocks/middleware'
import { filterData, normalizeQueryFilters } from '@/mocks/shared'

import allBreedsData from '@database/allBreedsData.json'

type Response = {
  id: string
  name: string
}

export const getAllBreedsService = httpWithMiddleware<never, never, Response[]>(
  {
    routePath: '/api/breeds/all',
    method: 'get',
    middlewares: [withDelay(), withAuth],
    resolver: async ({ request }) => {
      if (!allBreedsData.length) {
        return HttpResponse.json([], {
          status: 404,
        })
      }

      const url = new URL(request.url)
      const { filters } = normalizeQueryFilters(url)

      if (filters) {
        const filteredData = filterData<Response>(filters, allBreedsData)
        return HttpResponse.json(filteredData, { status: HttpStatusCode.ok })
      }

      return HttpResponse.json(allBreedsData, { status: HttpStatusCode.ok })
    },
  }
)
