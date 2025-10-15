import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

export const updateVegetableDiseaseHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'id'>,
  never,
  never
>({
  routePath: '/api/properties/:propertyId/vegetables/diseases/:id',
  method: 'patch',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json(undefined, { status: HttpStatusCode.noContent }),
})
