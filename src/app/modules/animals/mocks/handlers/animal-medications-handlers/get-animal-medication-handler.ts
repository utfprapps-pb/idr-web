import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import animalMedicationsData from '@database/animalMedicationsData.json'

import { withAnimalId } from '../../utils/with-animal-id'

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
    const found = animalMedicationsData.find((item) => item.id === params.id)

    if (!found) {
      return HttpResponse.json({} as AnimalMedicationApiResponse, {
        status: HttpStatusCode.notFound,
      })
    }

    return HttpResponse.json(withAnimalId(found, String(params.animalId)), {
      status: HttpStatusCode.ok,
    })
  },
})
