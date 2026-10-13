import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

export const updateCityHandler = httpWithMiddleware<
  PathParams<'id'>,
  never,
  never
>({
  routePath: '/api/v1/cities/:id',
  method: 'put',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json(undefined, { status: HttpStatusCode.ok }),
})
