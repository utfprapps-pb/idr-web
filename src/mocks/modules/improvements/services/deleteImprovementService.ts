import { HttpResponse, type PathParams } from 'msw'

import { httpWithMiddleware } from '@/mocks/lib'
import { withAuth, withDelay } from '@/mocks/middleware'

export const deleteImprovementService = httpWithMiddleware<
  PathParams<'propertyId' | 'id'>,
  never,
  never
>({
  routePath: '/api/properties/:propertyId/improvements/:id',
  method: 'delete',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json(undefined, {
      status: 204,
    }),
})
