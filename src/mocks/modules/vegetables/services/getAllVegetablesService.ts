import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/data/protocols/http'
import { httpWithMiddleware } from '@/mocks/lib'
import { withAuth, withDelay } from '@/mocks/middleware'
import { filterData, normalizeQueryFilters } from '@/mocks/shared'

import allVegetablesData from '@database/allVegetablesData.json'

type Response = {
  id: string
  name: string
}

export const getAllVegetablesService = httpWithMiddleware<
  never,
  never,
  Response[]
>({
  routePath: '/api/vegetables/all',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    if (!allVegetablesData.length) {
      return HttpResponse.json([], {
        status: 404,
      })
    }

    const url = new URL(request.url)
    const { filters } = normalizeQueryFilters(url)

    if (filters) {
      const filteredData = filterData<Response>(filters, allVegetablesData)
      return HttpResponse.json(filteredData, { status: HttpStatusCode.ok })
    }

    return HttpResponse.json(allVegetablesData, { status: HttpStatusCode.ok })
  },
})
