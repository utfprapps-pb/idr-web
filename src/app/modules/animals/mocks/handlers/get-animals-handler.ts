import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { filterData, sortData, paginateData } from '@/core/mocks/utils'

import animalsData from '@database/animalsData.json'

import type { AnimalApiResponse } from '../../domain/models/animals-model'
import type { MockParams } from '@/core/mocks/types/mock-params-type'
import type { MockResponse } from '@/core/mocks/types/mock-response-type'

export const getAnimalsHandler = httpWithMiddleware<
  PathParams<'propertyId'>,
  MockParams<AnimalApiResponse>,
  MockResponse<AnimalApiResponse[]>
>({
  routePath: '/api/properties/:propertyId/animals/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, page, rows, sort } = await request.json()

    if (!animalsData.length) {
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

    let animals = animalsData as AnimalApiResponse[]

    if (filters) animals = filterData<AnimalApiResponse>(filters, animals)
    if (sort) animals = sortData<AnimalApiResponse>(sort, animals)
    const numberOfElements = animals.length

    if (page)
      animals = paginateData<AnimalApiResponse>(
        { page, perPage: rows },
        animals
      )

    return HttpResponse.json(
      {
        content: animals,
        numberOfElements,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
