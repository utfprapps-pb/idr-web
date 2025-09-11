import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { filterData, sortData, paginateData } from '@/core/mocks/utils'

import foragesData from '@database/foragesData.json'

import type { ForageApiResponse } from '../../domain/models/forages-model'
import type { MockParams } from '@/core/mocks/types/mock-params-type'
import type { MockResponse } from '@/core/mocks/types/mock-response-type'

export const getForagesHandler = httpWithMiddleware<
  PathParams<'propertyId'>,
  MockParams<ForageApiResponse>,
  MockResponse<ForageApiResponse[]>
>({
  routePath: '/api/properties/:propertyId/forages/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, page, rows, sort } = await request.json()

    if (!foragesData.length) {
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

    let forages = foragesData as ForageApiResponse[]

    if (filters) forages = filterData<ForageApiResponse>(filters, forages)
    if (sort) forages = sortData<ForageApiResponse>(sort, forages)
    const numberOfElements = forages.length

    if (page)
      forages = paginateData<ForageApiResponse>(
        { page, perPage: rows },
        forages
      )

    return HttpResponse.json(
      {
        content: forages,
        numberOfElements,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
