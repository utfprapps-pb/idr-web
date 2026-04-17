import { faker } from '@faker-js/faker/locale/pt_BR'
import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import animalMedicationsData from '@database/animalMedicationsData.json'

import type { AnimalMedicationDetailsApiResponse } from '../../../domain/models/animal-medications-model'

export const getAnimalMedicationHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  AnimalMedicationDetailsApiResponse
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/medications/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!animalMedicationsData.length) {
      return HttpResponse.json({} as AnimalMedicationDetailsApiResponse, {
        status: 404,
      })
    }

    const animalMedicationFound = animalMedicationsData.find(
      (animal) => animal.id === Number(params.id)
    )

    if (!animalMedicationFound) {
      return HttpResponse.json({} as AnimalMedicationDetailsApiResponse, {
        status: 404,
      })
    }

    return HttpResponse.json(
      {
        date: animalMedicationFound.date,
        product: {
          label: animalMedicationFound.product,
          value: faker.number.int({ min: 1, max: 1000 }),
        },
        applicationMethod: animalMedicationFound.applicationMethod,
        appliedDose: animalMedicationFound.appliedDose,
      },
      { status: HttpStatusCode.ok }
    )
  },
})
