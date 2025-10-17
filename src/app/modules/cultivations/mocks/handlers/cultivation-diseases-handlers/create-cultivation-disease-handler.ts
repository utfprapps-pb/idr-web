import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { CultivationDiseaseDetailsModel } from '../../../domain/models/cultivation-diseases-model'

export const createCultivationDiseaseHandler = httpWithMiddleware<
  PathParams<'propertyId'>,
  CultivationDiseaseDetailsModel,
  never
>({
  routePath: '/api/properties/:propertyId/cultivations/diseases',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json({}, { status: HttpStatusCode.created }),
})
