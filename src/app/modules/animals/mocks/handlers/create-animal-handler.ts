import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { AnimalDetailsModel } from '../../domain/models/animals-model'

export const createAnimalHandler = httpWithMiddleware<
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
