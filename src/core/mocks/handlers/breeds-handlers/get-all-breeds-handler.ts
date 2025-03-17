import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { normalizeQueryFilters, filterData } from '@/core/mocks/utils'

import allBreedsData from '@database/allBreedsData.json'

type Response = {
  id: string
  name: string
}

export const getAllBreedsHandler = httpWithMiddleware<never, never, Response[]>(
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
