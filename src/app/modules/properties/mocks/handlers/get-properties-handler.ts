import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import {
  normalizeQueryFilters,
  filterData,
  sortData,
  paginateData,
} from '@/core/mocks/utils'

import propertiesData from '@database/propertiesData.json'

type Params = {
  filter: string
  sort: string
  pagination: string
}

type Property = {
  id: string
  name: string
  city: string
  state: string
  producer: string
}

type Response = {
  properties: Property[]
  totalRegisters: number
}

export const getPropertiesHandler = httpWithMiddleware<never, Params, Response>(
  {
    routePath: '/api/properties',
    method: 'get',
    middlewares: [withDelay(), withAuth],
    resolver: async ({ request }) => {
      if (!propertiesData.length) {
        return HttpResponse.json(
          {
            properties: [],
            totalRegisters: 0,
          },
          {
            status: 404,
          }
        )
      }

      const url = new URL(request.url)
      const { pagination, filters, sort } = normalizeQueryFilters(url)

      let properties = propertiesData

      if (filters) properties = filterData<Property>(filters, properties)
      if (sort) properties = sortData<Property>(sort, properties)
      const totalRegisters = properties.length

      if (pagination)
        properties = paginateData<Property>(pagination, properties)

      return HttpResponse.json(
        {
          properties,
          totalRegisters,
        },
        { status: HttpStatusCode.ok }
      )
    },
  }
)
