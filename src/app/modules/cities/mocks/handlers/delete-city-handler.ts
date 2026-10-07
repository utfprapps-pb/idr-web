import { HttpResponse, type PathParams } from 'msw'

import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

export const deleteCityHandler = httpWithMiddleware<
  PathParams<'id'>,
  never,
  never
>({
  routePath: '/api/v1/cities/:id',
  method: 'delete',
  middlewares: [withDelay(), withAuth],
  resolver: async () => HttpResponse.json(undefined, { status: 204 }),
})
