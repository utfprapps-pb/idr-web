import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { filterData, sortData, paginateData } from '@/core/mocks/utils'

import animalMastitidesData from '@database/animalMastitidesData.json'

import type { AnimalMastitisApiResponse } from '../../../domain/models/animal-mastitides-model'
import type { MockParams } from '@/core/mocks/types/mock-params-type'
import type { MockResponse } from '@/core/mocks/types/mock-response-type'

export const getAnimalMastitidesHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  MockParams<AnimalMastitisApiResponse>,
  MockResponse<AnimalMastitisApiResponse[]>
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/mastitides/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, page, rows, sort } = await request.json()

    if (!animalMastitidesData.length) {
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

    let animalMastitides = animalMastitidesData as AnimalMastitisApiResponse[]

    if (filters)
      animalMastitides = filterData<AnimalMastitisApiResponse>(
        filters,
        animalMastitides
      )
    if (sort)
      animalMastitides = sortData<AnimalMastitisApiResponse>(
        sort,
        animalMastitides
      )
    const numberOfElements = animalMastitides.length
    animalMastitides = paginateData<AnimalMastitisApiResponse>(
      { page, perPage: rows },
      animalMastitides
    )

    return HttpResponse.json(
      {
        content: animalMastitides,
        numberOfElements,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
