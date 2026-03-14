import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { NutritionalBalancingDetailsModel } from '../../domain/models/nutritional-balancings-model'

export const createNutritionalBalancingHandler = httpWithMiddleware<
  PathParams<'propertyId'>,
  NutritionalBalancingDetailsModel,
  never
>({
  routePath: '/api/properties/:propertyId/nutritional-balancings',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json({}, { status: HttpStatusCode.created }),
})
