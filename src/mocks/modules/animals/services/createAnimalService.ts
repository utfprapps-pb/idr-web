import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/data/protocols/http'
import { httpWithMiddleware } from '@/mocks/lib'
import { withAuth, withDelay } from '@/mocks/middleware'

import type { AnimalDetailsModel } from '@/domain/models/animalModel'

export const createAnimalService = httpWithMiddleware<
  PathParams<'propertyId'>,
  AnimalDetailsModel,
  never
>({
  routePath: '/api/properties/:propertyId/animals',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json({}, { status: HttpStatusCode.created }),
})
