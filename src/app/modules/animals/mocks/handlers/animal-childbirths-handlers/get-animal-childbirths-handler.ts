import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { filterData, sortData, paginateData } from '@/core/mocks/utils'

import animalChildbirthsData from '@database/animalChildbirthsData.json'

import type { AnimalChildbirthApiResponse } from '../../../domain/models/animal-childbirths-model'
import type { MockParams } from '@/core/mocks/types/mock-params-type'
import type { MockResponse } from '@/core/mocks/types/mock-response-type'

export const getAnimalChildbirthsHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  MockParams<AnimalChildbirthApiResponse>,
  MockResponse<AnimalChildbirthApiResponse[]>
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/childbirths/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, page, rows, sort } = await request.json()

    if (!animalChildbirthsData.length) {
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

    let animalChildbirths =
      animalChildbirthsData as AnimalChildbirthApiResponse[]

    if (filters)
      animalChildbirths = filterData<AnimalChildbirthApiResponse>(
        filters,
        animalChildbirths
      )
    if (sort)
      animalChildbirths = sortData<AnimalChildbirthApiResponse>(
        sort,
        animalChildbirths
      )
    const numberOfElements = animalChildbirths.length

    if (page)
      animalChildbirths = paginateData<AnimalChildbirthApiResponse>(
        { page, perPage: rows },
        animalChildbirths
      )

    return HttpResponse.json(
      {
        content: animalChildbirths,
        numberOfElements,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
