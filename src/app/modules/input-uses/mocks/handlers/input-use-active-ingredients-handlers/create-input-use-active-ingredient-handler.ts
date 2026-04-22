import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { InputUseActiveIngredientDetailsModel } from '@/app/modules/input-uses/domain/models/input-use-active-ingredients-model'

export const createInputUseActiveIngredientHandler = httpWithMiddleware<
  PathParams,
  InputUseActiveIngredientDetailsModel,
  never
>({
  routePath: '/api/input-uses/active-ingredients',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json({}, { status: HttpStatusCode.created }),
})
