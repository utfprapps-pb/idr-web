import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { AnimalDiseaseDetailsModel } from '../../../domain/models/animal-diseases-model'

export const createAnimalDiseaseHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  AnimalDiseaseDetailsModel,
  never
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/diseases',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json({}, { status: HttpStatusCode.created }),
})
