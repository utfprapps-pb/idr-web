import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { VegetableDiseaseDetailsModel } from '../../../domain/models/vegetable-diseases-model'

export const createVegetableDiseaseHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'vegetableId'>,
  VegetableDiseaseDetailsModel,
  never
>({
  routePath: '/api/properties/:propertyId/vegetables/diseases',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json({}, { status: HttpStatusCode.created }),
})
