import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { filterData, sortData, paginateData } from '@/core/mocks/utils'

import animalInseminationsData from '@database/animalInseminationsData.json'

import type { AnimalInseminationApiResponse } from '../../../domain/models/animal-inseminations-model'
import type { MockParams } from '@/core/mocks/types/mock-params-type'
import type { MockResponse } from '@/core/mocks/types/mock-response-type'

export const getAnimalInseminationsHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  MockParams<AnimalInseminationApiResponse>,
  MockResponse<AnimalInseminationApiResponse[]>
>({
  routePath:
    '/api/properties/:propertyId/animals/:animalId/inseminations/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, page, rows, sort } = await request.json()

    if (!animalInseminationsData.length) {
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

    let animalInseminations = animalInseminationsData

    if (filters)
      animalInseminations = filterData<AnimalInseminationApiResponse>(
        filters,
        animalInseminations
      )
    if (sort)
      animalInseminations = sortData<AnimalInseminationApiResponse>(
        sort,
        animalInseminations
      )

    const numberOfElements = animalInseminations.length
    animalInseminations = paginateData<AnimalInseminationApiResponse>(
      { page, perPage: rows },
      animalInseminations
    )

    return HttpResponse.json(
      {
        content: animalInseminations,
        numberOfElements,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
