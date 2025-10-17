import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { GeneralCultivationPestDetailsModel } from '../../../domain/models/general-cultivation-pests-model'

export const createGeneralCultivationPestHandler = httpWithMiddleware<
  PathParams<'propertyId'>,
  GeneralCultivationPestDetailsModel,
  never
>({
  routePath: '/api/general-cultivations/pests',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json({}, { status: HttpStatusCode.created }),
})
