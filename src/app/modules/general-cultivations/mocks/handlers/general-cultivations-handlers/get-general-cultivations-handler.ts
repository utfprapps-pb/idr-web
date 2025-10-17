import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { filterData, sortData, paginateData } from '@/core/mocks/utils'

import generalCultivationsData from '@database/generalCultivationsData.json'

import type { GeneralCultivationApiResponse } from '../../../domain/models/general-cultivations-model'
import type { MockParams } from '@/core/mocks/types/mock-params-type'
import type { MockResponse } from '@/core/mocks/types/mock-response-type'

export const getGeneralCultivationsHandler = httpWithMiddleware<
  PathParams<'propertyId'>,
  MockParams<GeneralCultivationApiResponse>,
  MockResponse<GeneralCultivationApiResponse[]>
>({
  routePath: '/api/general-cultivations/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, page, rows, sort } = await request.json()

    if (!generalCultivationsData.length) {
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

    let generalCultivations = generalCultivationsData.map((disease) => ({
      id: disease.id,
      name: disease.name,
    }))

    if (filters)
      generalCultivations = filterData<GeneralCultivationApiResponse>(
        filters,
        generalCultivations
      )
    if (sort)
      generalCultivations = sortData<GeneralCultivationApiResponse>(
        sort,
        generalCultivations
      )

    const numberOfElements = generalCultivations.length
    generalCultivations = paginateData<GeneralCultivationApiResponse>(
      { page, perPage: rows },
      generalCultivations
    )

    return HttpResponse.json(
      {
        content: generalCultivations,
        numberOfElements,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
