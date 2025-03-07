import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import type { PropertyDetailsModel } from '@/app/modules/properties/domain/models/properties-model'

export const createForageHandler = httpWithMiddleware<
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
