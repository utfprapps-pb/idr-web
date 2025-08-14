import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { AnimalPregnancyDiagnosisDetailsApiResponse } from '../../../domain/models/animal-pregnancy-diagnoses-model'

export const createAnimalPregnancyDiagnosisHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  AnimalPregnancyDiagnosisDetailsApiResponse,
  never
>({
  routePath:
    '/api/properties/:propertyId/animals/:animalId/pregnancy-diagnoses',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json({}, { status: HttpStatusCode.created }),
})
