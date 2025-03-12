import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'

import allVegetablesData from '@database/allVegetablesData.json'

import { httpWithMiddleware } from '../../lib'
import { withDelay, withAuth } from '../../middleware'
import { normalizeQueryFilters, filterData } from '../../utils'

type Response = {
  id: string
  name: string
}

export const getAllVegetablesHandler = httpWithMiddleware<
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
