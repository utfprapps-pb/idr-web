import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import type { AnimalUpdateApiRequest } from '../../domain/models/animals-model'

export const updateAnimalHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'id'>,
  AnimalUpdateApiRequest,
  never
>({
  routePath: '/api/properties/:propertyId/animals/:id',
  method: 'put',
  middlewares: [withDelay(), withAuth],
  resolver: async () => HttpResponse.json({}, { status: HttpStatusCode.ok }),
})
