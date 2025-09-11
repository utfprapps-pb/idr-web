import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { filterData, sortData, paginateData } from '@/core/mocks/utils'

import improvementsData from '@database/improvementsData.json'

import type { ImprovementApiResponse } from '../../domain/models/improvements-model'
import type { MockParams } from '@/core/mocks/types/mock-params-type'
import type { MockResponse } from '@/core/mocks/types/mock-response-type'

export const getImprovementsHandler = httpWithMiddleware<
  PathParams<'propertyId'>,
  MockParams<ImprovementApiResponse>,
  MockResponse<ImprovementApiResponse[]>
>({
  routePath: '/api/properties/:propertyId/improvements/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, page, rows, sort } = await request.json()

    if (!improvementsData.length) {
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

    let improvements = improvementsData as ImprovementApiResponse[]

    if (filters)
      improvements = filterData<ImprovementApiResponse>(filters, improvements)
    if (sort)
      improvements = sortData<ImprovementApiResponse>(sort, improvements)
    const totalRegisters = improvements.length

    if (page)
      improvements = paginateData<ImprovementApiResponse>(
        { page, perPage: rows },
        improvements
      )

    return HttpResponse.json(
      {
        content: improvements,
        numberOfElements: totalRegisters,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
