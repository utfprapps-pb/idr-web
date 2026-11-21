import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { AnimalCreateApiRequest } from '../../domain/models/animals-model'

export const createAnimalHandler = httpWithMiddleware<
  PathParams<'propertyId'>,
  AnimalCreateApiRequest,
  never
>({
  routePath: '/api/properties/:propertyId/animals',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () => HttpResponse.json({}, { status: HttpStatusCode.ok }),
})
