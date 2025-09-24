import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { filterData, sortData, paginateData } from '@/core/mocks/utils'

import propertiesData from '@database/propertiesData.json'

import type { PropertyApiResponse } from '../../domain/models/properties-model'
import type { MockParams } from '@/core/mocks/types/mock-params-type'
import type { MockResponse } from '@/core/mocks/types/mock-response-type'

export const getPropertiesHandler = httpWithMiddleware<
  never,
  MockParams<PropertyApiResponse>,
  MockResponse<PropertyApiResponse[]>
>({
  routePath: '/api/properties/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, page, rows, sort } = await request.json()

    if (!propertiesData.length) {
      return HttpResponse.json(
        {
          content: [],
          numberOfElements: 0,
          pageable: {
            pageSize: rows,
          },
        },
        {
          status: 404,
        }
      )
    }

    let properties = propertiesData as PropertyApiResponse[]

    if (filters)
      properties = filterData<PropertyApiResponse>(filters, properties)
    if (sort) properties = sortData<PropertyApiResponse>(sort, properties)
    const numberOfElements = properties.length
    properties = paginateData<PropertyApiResponse>(
      {
        page,
        perPage: rows,
      },
      properties
    )

    return HttpResponse.json(
      {
        content: properties,
        numberOfElements,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
