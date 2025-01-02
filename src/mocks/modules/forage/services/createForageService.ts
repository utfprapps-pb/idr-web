import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/data/protocols/http'
import { httpWithMiddleware } from '@/mocks/lib'
import { withAuth, withDelay } from '@/mocks/middleware'

import type { PropertyDetailsModel } from '@/domain/models/propertyModel'

export const createForageService = httpWithMiddleware<
  PathParams<'propertyId'>,
  PropertyDetailsModel,
  never
>({
  routePath: '/api/properties/:propertyId/forages',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json({}, { status: HttpStatusCode.created }),
})
