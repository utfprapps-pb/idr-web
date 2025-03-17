import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'

import allUsersData from '@database/allUsersData.json'

import { httpWithMiddleware } from '../../lib'
import { withDelay, withAuth } from '../../middleware'
import { normalizeQueryFilters, filterData } from '../../utils'

type Response = {
  id: string
  name: string
}

export const getAllUsersHandler = httpWithMiddleware<never, never, Response[]>({
  routePath: '/api/users/all',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    if (!allUsersData.length) {
      return HttpResponse.json([], {
        status: 404,
      })
    }

    const url = new URL(request.url)
    const { filters } = normalizeQueryFilters(url)

    if (filters) {
      const filteredData = filterData<Response>(filters, allUsersData)
      return HttpResponse.json(filteredData, { status: HttpStatusCode.ok })
    }

    return HttpResponse.json(allUsersData, { status: HttpStatusCode.ok })
  },
})
