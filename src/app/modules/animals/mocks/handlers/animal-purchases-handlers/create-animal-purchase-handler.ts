import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { AnimalPurchaseDetailsModel } from '../../../domain/models/animal-purchases-model'

export const createAnimalPurchaseHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  AnimalPurchaseDetailsModel,
  never
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/purchases',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json({}, { status: HttpStatusCode.created }),
})
