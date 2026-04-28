import { HttpResponse, type PathParams } from 'msw'

import { type ForageAvailabilityDetailsModel } from '@/app/modules/forage-availability/domain/models/forage-availability-model'
import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

export const createForageAvailabilityHandler = httpWithMiddleware<
  PathParams<'propertyId'>,
  ForageAvailabilityDetailsModel,
  never
>({
  routePath: '/api/properties/:propertyId/forage-availabilities',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json({}, { status: HttpStatusCode.created }),
})
