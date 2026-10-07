import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

export const updateUserPermissionsHandler = httpWithMiddleware<
  PathParams<'userId'>,
  never,
  never
>({
  routePath: '/api/v1/users/:userId/permissions',
  method: 'put',
  middlewares: [withDelay(), withAuth],
  resolver: async () => HttpResponse.json({}, { status: HttpStatusCode.ok }),
})
