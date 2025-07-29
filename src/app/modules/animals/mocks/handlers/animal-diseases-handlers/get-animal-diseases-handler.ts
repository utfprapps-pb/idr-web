import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { filterData, sortData, paginateData } from '@/core/mocks/utils'

import animalDiseasesData from '@database/animalDiseasesData.json'

import type { AnimalDiseaseApiResponse } from '../../../domain/models/animal-diseases-model'
import type { MockParams } from '@/core/mocks/types/mock-params-type'
import type { MockResponse } from '@/core/mocks/types/mock-response-type'

export const getAnimalDiseasesHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  MockParams<AnimalDiseaseApiResponse>,
  MockResponse<AnimalDiseaseApiResponse[]>
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/diseases/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, page, rows, sort } = await request.json()

    if (!animalDiseasesData.length) {
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

    let animalDiseases = animalDiseasesData

    if (filters)
      animalDiseases = filterData<AnimalDiseaseApiResponse>(
        filters,
        animalDiseases
      )
    if (sort)
      animalDiseases = sortData<AnimalDiseaseApiResponse>(sort, animalDiseases)

    const numberOfElements = animalDiseases.length

    if (page)
      animalDiseases = paginateData<AnimalDiseaseApiResponse>(
        { page, perPage: rows },
        animalDiseases
      )

    return HttpResponse.json(
      {
        content: animalDiseases,
        numberOfElements,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
