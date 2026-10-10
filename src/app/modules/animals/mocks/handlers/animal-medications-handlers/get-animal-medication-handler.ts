import { faker } from '@faker-js/faker/locale/pt_BR'
import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import animalMedicationsData from '@database/animalMedicationsData.json'

import type { AnimalMedicationApiResponse } from '../../../domain/models/animal-medications-model'

export const getAnimalMedicationHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  AnimalMedicationApiResponse
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/medications/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!animalMedicationsData.length) {
      return HttpResponse.json({} as AnimalMedicationApiResponse, {
        status: 404,
      })
    }

    const animalMedicationFound = animalMedicationsData.find(
      (animal) => animal.id === params.id
    )

    if (!animalMedicationFound) {
      return HttpResponse.json({} as AnimalMedicationApiResponse, {
        status: 404,
      })
    }

    return HttpResponse.json(
      {
        id: animalMedicationFound.id,
        animalId: String(params.animalId),
        productId: faker.string.uuid(),
        applicationDate: animalMedicationFound.date,
        applicationWay: animalMedicationFound.applicationMethod,
        appliedDose: animalMedicationFound.appliedDose,
      },
      { status: HttpStatusCode.ok }
    )
  },
})
