import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { InputUseLocationApiResponse } from '@/app/modules/input-uses/domain/models/input-use-locations-model'

export const updateInputUseLocationHandler = httpWithMiddleware<
  PathParams<'id'>,
  Omit<InputUseLocationApiResponse, 'id'>,
  never
>({
  routePath: '/api/input-uses/locations/:id',
  method: 'patch',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json(undefined, { status: HttpStatusCode.noContent }),
})
