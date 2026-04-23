import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { InputUseActiveIngredientApiResponse } from '@/app/modules/input-uses/domain/models/input-use-active-ingredients-model'

export const updateInputUseActiveIngredientHandler = httpWithMiddleware<
  PathParams<'id'>,
  Omit<InputUseActiveIngredientApiResponse, 'id'>,
  never
>({
  routePath: '/api/input-uses/active-ingredients/:id',
  method: 'patch',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json(undefined, { status: HttpStatusCode.noContent }),
})
