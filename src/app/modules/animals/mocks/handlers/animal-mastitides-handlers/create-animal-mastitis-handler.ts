import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { AnimalMastitisDetailsModel } from '../../../domain/models/animal-mastitides-model'

export const createAnimalMastitisHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  AnimalMastitisDetailsModel,
  never
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/mastitides',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json({}, { status: HttpStatusCode.created }),
})
