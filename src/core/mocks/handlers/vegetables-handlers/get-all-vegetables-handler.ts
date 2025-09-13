import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'

import allVegetablesData from '@database/allVegetablesData.json'

import { httpWithMiddleware } from '../../lib'
import { withDelay, withAuth } from '../../middleware'
import { filterData } from '../../utils'

import type { MockParams } from '../../types/mock-params-type'
import type { MockResponse } from '../../types/mock-response-type'
import type { VegetableApiResponse } from '@/core/domain/models/vegetables-model'

export const getAllVegetablesHandler = httpWithMiddleware<
  never,
  MockParams<VegetableApiResponse>,
  MockResponse<VegetableApiResponse[]>
>({
  routePath: '/api/vegetables/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, rows } = await request.json()

    if (!allVegetablesData.length) {
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

    if (filters) {
      const vegetables = filterData<VegetableApiResponse>(
        filters,
        allVegetablesData
      )
      return HttpResponse.json(
        {
          content: vegetables,
          numberOfElements: vegetables.length,
          pageable: {
            pageSize: rows,
          },
        },
        { status: HttpStatusCode.ok }
      )
    }

    return HttpResponse.json(
      {
        content: allVegetablesData,
        numberOfElements: allVegetablesData.length,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
