import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import type { MachineDetailsModel } from '../../domain/models/machines-model'

export const createMachineHandler = httpWithMiddleware<
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
