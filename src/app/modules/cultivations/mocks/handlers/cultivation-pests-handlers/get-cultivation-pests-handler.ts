import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { filterData, sortData, paginateData } from '@/core/mocks/utils'

import cultivationPestsData from '@database/cultivationPestsData.json'

import type { CultivationPestApiResponse } from '../../../domain/models/cultivation-pests-model'
import type { MockParams } from '@/core/mocks/types/mock-params-type'
import type { MockResponse } from '@/core/mocks/types/mock-response-type'

export const getCultivationPestsHandler = httpWithMiddleware<
  PathParams<'propertyId'>,
  MockParams<CultivationPestApiResponse>,
  MockResponse<CultivationPestApiResponse[]>
>({
  routePath: '/api/properties/:propertyId/cultivations/pests/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, page, rows, sort } = await request.json()

    if (!cultivationPestsData.length) {
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

    let cultivationPests = cultivationPestsData.map((pest) => ({
      id: pest.id,
      cultivation: pest.cultivation.name,
      pest: pest.pest.name,
      infestationType: pest.infestationType,
    }))

    if (filters)
      cultivationPests = filterData<CultivationPestApiResponse>(
        filters,
        cultivationPests
      )
    if (sort)
      cultivationPests = sortData<CultivationPestApiResponse>(
        sort,
        cultivationPests
      )

    const numberOfElements = cultivationPests.length
    cultivationPests = paginateData<CultivationPestApiResponse>(
      { page, perPage: rows },
      cultivationPests
    )

    return HttpResponse.json(
      {
        content: cultivationPests,
        numberOfElements,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
