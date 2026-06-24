import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

export const getUserPermissionsHandler = httpWithMiddleware<
  PathParams<'userId'>,
  never,
  never
>({
  routePath: '/api/v1/users/:userId/permissions',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async () => {
    return HttpResponse.json(
      {
        role: 'GERENCIA_MACRO',
        readOnly: false,
        regionIds: ['r1b2c3d4-0001-0000-0000-000000000001'],
        cityIds: [],
      },
      { status: HttpStatusCode.ok }
    )
  },
})
