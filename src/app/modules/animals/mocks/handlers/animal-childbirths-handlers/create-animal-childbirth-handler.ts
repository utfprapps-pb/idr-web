import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { AnimalChildbirthDetailsModel } from '../../../domain/models/animal-childbirths-model'

export const createAnimalChildbirthHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  AnimalChildbirthDetailsModel,
  never
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/childbirths',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json({}, { status: HttpStatusCode.created }),
})
