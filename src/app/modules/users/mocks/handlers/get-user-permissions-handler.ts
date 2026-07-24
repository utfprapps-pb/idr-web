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
  resolver: async ({ params }) => {
    return HttpResponse.json(
      {
        userId: String(params.userId),
        permissions: [
          {
            id: '30469ba2-7668-4130-b1c2-d1981eb645c8',
            role: 'GERENCIA_MACRO',
            readOnly: false,
            regionIds: ['r1b2c3d4-0001-0000-0000-000000000001'],
            cityIds: [],
          },
        ],
      },
      { status: HttpStatusCode.ok }
    )
  },
})
