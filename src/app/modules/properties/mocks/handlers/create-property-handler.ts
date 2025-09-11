import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import type { PropertyDetailsModel } from '../../domain/models/properties-model'

export const createPropertyHandler = httpWithMiddleware<
  never,
  PropertyDetailsModel,
  never
>({
  routePath: '/api/properties',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json({}, { status: HttpStatusCode.created }),
})
