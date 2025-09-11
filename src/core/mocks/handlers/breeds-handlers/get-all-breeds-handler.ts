import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { filterData } from '@/core/mocks/utils'

import allBreedsData from '@database/allBreedsData.json'

import type { MockParams } from '../../types/mock-params-type'
import type { MockResponse } from '../../types/mock-response-type'
import type { BreedApiResponse } from '@/core/domain/models/breeds-model'

export const getAllBreedsHandler = httpWithMiddleware<
  never,
  MockParams<BreedApiResponse>,
  MockResponse<BreedApiResponse[]>
>({
  routePath: '/api/breeds/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, rows } = await request.json()

    if (!allBreedsData.length) {
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
      const breeds = filterData<BreedApiResponse>(filters, allBreedsData)

      return HttpResponse.json(
        {
          content: breeds,
          numberOfElements: breeds.length,
          pageable: {
            pageSize: rows,
          },
        },
        { status: HttpStatusCode.ok }
      )
    }

    return HttpResponse.json(
      {
        content: allBreedsData,
        numberOfElements: allBreedsData.length,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
