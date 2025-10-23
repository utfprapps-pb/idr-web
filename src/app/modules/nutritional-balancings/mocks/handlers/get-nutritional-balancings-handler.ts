import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { filterData, sortData, paginateData } from '@/core/mocks/utils'

import nutritionalBalancingsData from '@database/nutritionalBalancingsData.json'

import type { NutritionalBalancingApiResponse } from '../../domain/models/nutritional-balancings-model'
import type { MockParams } from '@/core/mocks/types/mock-params-type'
import type { MockResponse } from '@/core/mocks/types/mock-response-type'

export const getNutritionalBalancingsHandler = httpWithMiddleware<
  PathParams<'propertyId'>,
  MockParams<NutritionalBalancingApiResponse>,
  MockResponse<NutritionalBalancingApiResponse[]>
>({
  routePath: '/api/properties/:propertyId/nutritional-balancings/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, page, rows, sort } = await request.json()

    if (!nutritionalBalancingsData.length) {
      return HttpResponse.json(
        {
          content: [],
          numberOfElements: 0,
          pageable: {
            pageSize: 0,
          },
        },
        {
          status: 404,
        }
      )
    }

    let nutritionalBalancings =
      nutritionalBalancingsData as NutritionalBalancingApiResponse[]

    if (filters)
      nutritionalBalancings = filterData<NutritionalBalancingApiResponse>(
        filters,
        nutritionalBalancings
      )
    if (sort)
      nutritionalBalancings = sortData<NutritionalBalancingApiResponse>(
        sort,
        nutritionalBalancings
      )
    const numberOfElements = nutritionalBalancings.length
    nutritionalBalancings = paginateData<NutritionalBalancingApiResponse>(
      { page, perPage: rows },
      nutritionalBalancings
    )

    return HttpResponse.json(
      {
        content: nutritionalBalancings,
        numberOfElements,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
