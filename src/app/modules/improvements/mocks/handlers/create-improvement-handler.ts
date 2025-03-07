import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import type { ImprovementDetailsModel } from '../../domain/models/improvements-model'

export const createImprovementHandler = httpWithMiddleware<
  PathParams<'propertyId'>,
  ImprovementDetailsModel,
  never
>({
  routePath: '/api/properties/:propertyId/improvements',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json({}, { status: HttpStatusCode.created }),
})
