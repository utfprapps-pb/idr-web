import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { AnimalMedicationDetailsModel } from '../../../domain/models/animal-medications-model'

export const createAnimalMedicationHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  AnimalMedicationDetailsModel,
  never
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/medications',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json({}, { status: HttpStatusCode.created }),
})
