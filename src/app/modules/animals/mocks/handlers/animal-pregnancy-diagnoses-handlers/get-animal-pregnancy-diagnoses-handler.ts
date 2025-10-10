import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { filterData, sortData, paginateData } from '@/core/mocks/utils'

import animalPregnancyDiagnosesData from '@database/animalPregnancyDiagnosesData.json'

import type { AnimalPregnancyDiagnosisApiResponse } from '../../../domain/models/animal-pregnancy-diagnoses-model'
import type { MockParams } from '@/core/mocks/types/mock-params-type'
import type { MockResponse } from '@/core/mocks/types/mock-response-type'

export const getAnimalPregnancyDiagnosesHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  MockParams<AnimalPregnancyDiagnosisApiResponse>,
  MockResponse<AnimalPregnancyDiagnosisApiResponse[]>
>({
  routePath:
    '/api/properties/:propertyId/animals/:animalId/pregnancy-diagnoses/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, page, rows, sort } = await request.json()

    if (!animalPregnancyDiagnosesData.length) {
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

    let animalPregnancyDiagnoses = animalPregnancyDiagnosesData

    if (filters)
      animalPregnancyDiagnoses =
        filterData<AnimalPregnancyDiagnosisApiResponse>(
          filters,
          animalPregnancyDiagnoses
        )
    if (sort)
      animalPregnancyDiagnoses = sortData<AnimalPregnancyDiagnosisApiResponse>(
        sort,
        animalPregnancyDiagnoses
      )

    const numberOfElements = animalPregnancyDiagnoses.length
    animalPregnancyDiagnoses =
      paginateData<AnimalPregnancyDiagnosisApiResponse>(
        { page, perPage: rows },
        animalPregnancyDiagnoses
      )

    return HttpResponse.json(
      {
        content: animalPregnancyDiagnoses,
        numberOfElements,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
