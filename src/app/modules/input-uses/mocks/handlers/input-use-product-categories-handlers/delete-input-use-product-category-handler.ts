import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

export const deleteInputUseProductCategoryHandler = httpWithMiddleware<
  PathParams<'id'>,
  never,
  never
>({
  routePath: '/api/input-use-product-categories/:id',
  method: 'delete',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json(undefined, { status: HttpStatusCode.noContent }),
})
