import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'
import { filterData, paginateData, sortData } from '@/core/mocks/utils'

import inputUseLocationsData from '@database/inputUseLocationsData.json'

import type { InputUseLocationApiResponse } from '@/app/modules/input-uses/domain/models/input-use-locations-model'
import type { MockParams } from '@/core/mocks/types/mock-params-type'
import type { MockResponse } from '@/core/mocks/types/mock-response-type'

export const getInputUseLocationsHandler = httpWithMiddleware<
  PathParams,
  MockParams<InputUseLocationApiResponse>,
  MockResponse<InputUseLocationApiResponse[]>
>({
  routePath: '/api/input-uses/locations/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, page, rows, sort } = await request.json()

    if (!inputUseLocationsData.length) {
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

    let inputUseLocations = inputUseLocationsData

    if (filters) {
      inputUseLocations = filterData<InputUseLocationApiResponse>(
        filters,
        inputUseLocations
      )
    }
    if (sort) {
      inputUseLocations = sortData<InputUseLocationApiResponse>(
        sort,
        inputUseLocations
      )
    }

    const numberOfElements = inputUseLocations.length
    inputUseLocations = paginateData<InputUseLocationApiResponse>(
      { page, perPage: rows },
      inputUseLocations
    )

    return HttpResponse.json(
      {
        content: inputUseLocations,
        numberOfElements,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
