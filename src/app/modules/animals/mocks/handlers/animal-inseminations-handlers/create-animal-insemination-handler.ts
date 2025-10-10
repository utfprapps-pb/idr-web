import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { AnimalInseminationDetailsModel } from '../../../domain/models/animal-inseminations-model'

export const createAnimalInseminationHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  AnimalInseminationDetailsModel,
  never
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/inseminations',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json({}, { status: HttpStatusCode.created }),
})
