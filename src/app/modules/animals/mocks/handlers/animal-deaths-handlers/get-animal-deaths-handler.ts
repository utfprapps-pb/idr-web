import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { filterData, sortData, paginateData } from '@/core/mocks/utils'

import animalDeathsData from '@database/animalDeathsData.json'

import type { AnimalDeathApiResponse } from '../../../domain/models/animal-deaths-model'
import type { MockParams } from '@/core/mocks/types/mock-params-type'
import type { MockResponse } from '@/core/mocks/types/mock-response-type'

export const getAnimalDeathsHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  MockParams<AnimalDeathApiResponse>,
  MockResponse<AnimalDeathApiResponse[]>
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/deaths/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, page, rows, sort } = await request.json()

    if (!animalDeathsData.length) {
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

    let animalDeaths = animalDeathsData

    if (filters)
      animalDeaths = filterData<AnimalDeathApiResponse>(filters, animalDeaths)
    if (sort)
      animalDeaths = sortData<AnimalDeathApiResponse>(sort, animalDeaths)

    const numberOfElements = animalDeaths.length
    animalDeaths = paginateData<AnimalDeathApiResponse>(
      { page, perPage: rows },
      animalDeaths
    )

    return HttpResponse.json(
      {
        content: animalDeaths,
        numberOfElements,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
