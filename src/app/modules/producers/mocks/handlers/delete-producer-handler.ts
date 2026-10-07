import { HttpResponse, type PathParams } from 'msw'

import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

export const deleteProducerHandler = httpWithMiddleware<
  PathParams<'id'>,
  never,
  never
>({
  routePath: '/api/v1/producers/:id',
  method: 'delete',
  middlewares: [withDelay(), withAuth],
  resolver: async () => HttpResponse.json(undefined, { status: 204 }),
})
