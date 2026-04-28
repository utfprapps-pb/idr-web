import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

export const deleteForageAvailabilityHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'id'>,
  never,
  never
>({
  routePath: '/api/properties/:propertyId/forage-availabilities/:id',
  method: 'delete',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json(undefined, { status: HttpStatusCode.noContent }),
})
