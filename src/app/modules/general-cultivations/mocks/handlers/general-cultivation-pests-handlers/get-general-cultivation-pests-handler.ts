import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { filterData, sortData, paginateData } from '@/core/mocks/utils'

import generalCultivationPestsData from '@database/generalCultivationPestsData.json'

import type { GeneralCultivationPestApiResponse } from '../../../domain/models/general-cultivation-pests-model'
import type { MockParams } from '@/core/mocks/types/mock-params-type'
import type { MockResponse } from '@/core/mocks/types/mock-response-type'

export const getGeneralCultivationPestsHandler = httpWithMiddleware<
  PathParams<'propertyId'>,
  MockParams<GeneralCultivationPestApiResponse>,
  MockResponse<GeneralCultivationPestApiResponse[]>
>({
  routePath: '/api/general-cultivations/pests/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, page, rows, sort } = await request.json()

    if (!generalCultivationPestsData.length) {
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

    let generalCultivationPests = generalCultivationPestsData

    if (filters)
      generalCultivationPests = filterData<GeneralCultivationPestApiResponse>(
        filters,
        generalCultivationPests
      )
    if (sort)
      generalCultivationPests = sortData<GeneralCultivationPestApiResponse>(
        sort,
        generalCultivationPests
      )

    const numberOfElements = generalCultivationPests.length
    generalCultivationPests = paginateData<GeneralCultivationPestApiResponse>(
      { page, perPage: rows },
      generalCultivationPests
    )

    return HttpResponse.json(
      {
        content: generalCultivationPests,
        numberOfElements,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
