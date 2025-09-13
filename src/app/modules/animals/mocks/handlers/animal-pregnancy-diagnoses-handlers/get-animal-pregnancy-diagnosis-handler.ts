import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import animalPregnancyDiagnosesData from '@database/animalPregnancyDiagnosesData.json'

import type { AnimalPregnancyDiagnosisDetailsApiResponse } from '../../../domain/models/animal-pregnancy-diagnoses-model'

export const getAnimalPregnancyDiagnosisHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  AnimalPregnancyDiagnosisDetailsApiResponse
>({
  routePath:
    '/api/properties/:propertyId/animals/:animalId/pregnancy-diagnoses/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!animalPregnancyDiagnosesData.length) {
      return HttpResponse.json(
        {} as AnimalPregnancyDiagnosisDetailsApiResponse,
        {
          status: 404,
        }
      )
    }

    const animalPregnancyDiagnosisFound = animalPregnancyDiagnosesData.find(
      (animal) => animal.id === Number(params.id)
    )

    if (!animalPregnancyDiagnosisFound) {
      return HttpResponse.json(
        {} as AnimalPregnancyDiagnosisDetailsApiResponse,
        {
          status: 404,
        }
      )
    }

    return HttpResponse.json(
      {
        date: animalPregnancyDiagnosisFound.date,
        lastInseminationDate:
          animalPregnancyDiagnosisFound.lastInseminationDate,
      },
      { status: HttpStatusCode.ok }
    )
  },
})
