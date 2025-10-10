import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { filterData, sortData, paginateData } from '@/core/mocks/utils'

import animalMedicationsData from '@database/animalMedicationsData.json'

import type { AnimalMedicationApiResponse } from '../../../domain/models/animal-medications-model'
import type { MockParams } from '@/core/mocks/types/mock-params-type'
import type { MockResponse } from '@/core/mocks/types/mock-response-type'

export const getAnimalMedicationsHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  MockParams<AnimalMedicationApiResponse>,
  MockResponse<AnimalMedicationApiResponse[]>
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/medications/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, page, rows, sort } = await request.json()

    if (!animalMedicationsData.length) {
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

    let animalMedications =
      animalMedicationsData as AnimalMedicationApiResponse[]

    if (filters)
      animalMedications = filterData<AnimalMedicationApiResponse>(
        filters,
        animalMedications
      )
    if (sort)
      animalMedications = sortData<AnimalMedicationApiResponse>(
        sort,
        animalMedications
      )
    const numberOfElements = animalMedications.length
    animalMedications = paginateData<AnimalMedicationApiResponse>(
      { page, perPage: rows },
      animalMedications
    )

    return HttpResponse.json(
      {
        content: animalMedications,
        numberOfElements,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
