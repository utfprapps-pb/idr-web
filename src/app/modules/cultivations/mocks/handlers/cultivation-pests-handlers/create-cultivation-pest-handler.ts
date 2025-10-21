import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { CultivationPestDetailsModel } from '../../../domain/models/cultivation-pests-model'

export const createCultivationPestHandler = httpWithMiddleware<
  PathParams<'propertyId'>,
  CultivationPestDetailsModel,
  never
>({
  routePath: '/api/properties/:propertyId/cultivations/pests',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json({}, { status: HttpStatusCode.created }),
})
