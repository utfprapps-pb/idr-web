import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { AnimalHeiferCalfStageDetailsModel } from '../../../domain/models/animal-heifer-calf-stages-model'

export const createAnimalHeiferCalfStageHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  AnimalHeiferCalfStageDetailsModel,
  never
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/heifer-calf-stages',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json({}, { status: HttpStatusCode.created }),
})
