import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

export const deleteInputUseLocationHandler = httpWithMiddleware<
  PathParams<'id'>,
  never,
  never
>({
  routePath: '/api/input-uses/locations/:id',
  method: 'delete',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json(undefined, { status: HttpStatusCode.noContent }),
})
