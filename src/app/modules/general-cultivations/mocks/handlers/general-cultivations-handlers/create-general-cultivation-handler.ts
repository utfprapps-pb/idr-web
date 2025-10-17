import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { GeneralCultivationDetailsModel } from '../../../domain/models/general-cultivations-model'

export const createGeneralCultivationHandler = httpWithMiddleware<
  PathParams<'propertyId'>,
  GeneralCultivationDetailsModel,
  never
>({
  routePath: '/api/general-cultivations',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json({}, { status: HttpStatusCode.created }),
})
