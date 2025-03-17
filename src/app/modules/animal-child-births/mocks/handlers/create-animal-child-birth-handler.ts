import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { AnimalChildBirthDetailsModel } from '../../domain/models/animal-child-births-model'

export const createAnimalChildBirthHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  AnimalChildBirthDetailsModel,
  never
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/child-births',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json({}, { status: HttpStatusCode.created }),
})
