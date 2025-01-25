import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/data/protocols/http'
import { httpWithMiddleware } from '@/mocks/lib'
import { withAuth, withDelay } from '@/mocks/middleware'

import type { MachineDetailsModel } from '@/domain/models/machineModel'

export const createMachineService = httpWithMiddleware<
  PathParams<'propertyId'>,
  MachineDetailsModel,
  never
>({
  routePath: '/api/properties/:propertyId/machines',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json({}, { status: HttpStatusCode.created }),
})
