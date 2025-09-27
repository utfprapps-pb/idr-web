import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { AnimalSaleDetailsModel } from '../../../domain/models/animal-sales-model'

export const createAnimalSaleHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  AnimalSaleDetailsModel,
  never
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/sales',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json({}, { status: HttpStatusCode.created }),
})
