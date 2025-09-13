import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { AnimalDeathDetailsModel } from '../../../domain/models/animal-deaths-model'

export const createAnimalDeathHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  AnimalDeathDetailsModel,
  never
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/deaths',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json({}, { status: HttpStatusCode.created }),
})
