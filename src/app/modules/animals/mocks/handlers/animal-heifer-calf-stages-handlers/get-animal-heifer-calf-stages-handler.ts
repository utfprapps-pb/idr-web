import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { filterData, sortData, paginateData } from '@/core/mocks/utils'

import animalHeiferCalfStagesData from '@database/animalHeiferCalfStagesData.json'

import type { AnimalHeiferCalfStageApiResponse } from '../../../domain/models/animal-heifer-calf-stages-model'
import type { MockParams } from '@/core/mocks/types/mock-params-type'
import type { MockResponse } from '@/core/mocks/types/mock-response-type'

export const getAnimalHeiferCalfStagesHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  MockParams<AnimalHeiferCalfStageApiResponse>,
  MockResponse<AnimalHeiferCalfStageApiResponse[]>
>({
  routePath:
    '/api/properties/:propertyId/animals/:animalId/heifer-calf-stages/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, page, rows, sort } = await request.json()

    if (!animalHeiferCalfStagesData.length) {
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

    let animalHeiferCalfStages =
      animalHeiferCalfStagesData as AnimalHeiferCalfStageApiResponse[]

    if (filters)
      animalHeiferCalfStages = filterData<AnimalHeiferCalfStageApiResponse>(
        filters,
        animalHeiferCalfStages
      )
    if (sort)
      animalHeiferCalfStages = sortData<AnimalHeiferCalfStageApiResponse>(
        sort,
        animalHeiferCalfStages
      )
    const numberOfElements = animalHeiferCalfStages.length

    if (page)
      animalHeiferCalfStages = paginateData<AnimalHeiferCalfStageApiResponse>(
        { page, perPage: rows },
        animalHeiferCalfStages
      )

    return HttpResponse.json(
      {
        content: animalHeiferCalfStages,
        numberOfElements,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
