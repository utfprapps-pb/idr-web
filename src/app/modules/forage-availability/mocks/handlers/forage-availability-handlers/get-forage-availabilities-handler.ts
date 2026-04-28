import { HttpResponse, type PathParams } from 'msw'

import { type ForageAvailabilityApiResponse } from '@/app/modules/forage-availability/domain/models/forage-availability-model'
import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'
import { type MockParams } from '@/core/mocks/types/mock-params-type'
import { type MockResponse } from '@/core/mocks/types/mock-response-type'
import { filterData, paginateData, sortData } from '@/core/mocks/utils'

import forageAvailabilitiesData from '@database/forageAvailabilitiesData.json'

export const getForageAvailabilitiesHandler = httpWithMiddleware<
  PathParams<'propertyId'>,
  MockParams<ForageAvailabilityApiResponse>,
  MockResponse<ForageAvailabilityApiResponse[]>
>({
  routePath: '/api/properties/:propertyId/forage-availabilities/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, page, rows, sort } = await request.json()

    if (!forageAvailabilitiesData.length) {
      return HttpResponse.json(
        {
          content: [],
          numberOfElements: 0,
          pageable: {
            pageSize: 0,
          },
        },
        {
          status: HttpStatusCode.ok,
        }
      )
    }

    let forageAvailabilities =
      forageAvailabilitiesData as ForageAvailabilityApiResponse[]

    if (filters) {
      forageAvailabilities = filterData<ForageAvailabilityApiResponse>(
        filters,
        forageAvailabilities
      )
    }
    if (sort) {
      forageAvailabilities = sortData<ForageAvailabilityApiResponse>(
        sort,
        forageAvailabilities
      )
    }

    const numberOfElements = forageAvailabilities.length
    forageAvailabilities = paginateData<ForageAvailabilityApiResponse>(
      { page, perPage: rows },
      forageAvailabilities
    )

    return HttpResponse.json(
      {
        content: forageAvailabilities,
        numberOfElements,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
