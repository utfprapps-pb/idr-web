import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import userPermissionsData from '@database/userPermissionsData.json'

export const getUserPermissionsHandler = httpWithMiddleware<
  PathParams<'userId'>,
  never,
  never
>({
  routePath: '/api/v1/users/:userId/permissions',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    return HttpResponse.json(
      {
        userId: String(params.userId),
        permissions: userPermissionsData,
      },
      { status: HttpStatusCode.ok }
    )
  },
})
