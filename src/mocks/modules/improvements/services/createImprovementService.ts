import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/data/protocols/http'
import { httpWithMiddleware } from '@/mocks/lib'
import { withAuth, withDelay } from '@/mocks/middleware'

import type { ImprovementDetailsModel } from '@/domain/models/improvementModel'

export const createImprovementService = httpWithMiddleware<
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
