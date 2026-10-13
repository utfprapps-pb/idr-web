import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

export const createProducerHandler = httpWithMiddleware<never, never, never>({
  routePath: '/api/v1/producers',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () => HttpResponse.json({}, { status: HttpStatusCode.ok }),
})
