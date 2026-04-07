import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { InputUseLocationDetailsModel } from '@/app/modules/input-uses/domain/models/input-use-locations-model'

export const createInputUseLocationHandler = httpWithMiddleware<
  PathParams,
  InputUseLocationDetailsModel,
  never
>({
  routePath: '/api/input-uses/locations',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json({}, { status: HttpStatusCode.created }),
})
