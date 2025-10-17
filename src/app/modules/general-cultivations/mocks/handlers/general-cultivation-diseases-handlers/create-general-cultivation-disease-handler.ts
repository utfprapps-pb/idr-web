import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { GeneralCultivationDiseaseDetailsModel } from '../../../domain/models/general-cultivation-diseases-model'

export const createGeneralCultivationDiseaseHandler = httpWithMiddleware<
  PathParams<'propertyId'>,
  GeneralCultivationDiseaseDetailsModel,
  never
>({
  routePath: '/api/general-cultivations/diseases',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json({}, { status: HttpStatusCode.created }),
})
