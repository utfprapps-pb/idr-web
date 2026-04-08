import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { InputUseProductCategoryDetailsModel } from '@/app/modules/input-uses/domain/models/input-use-product-categories-model'

export const createInputUseProductCategoryHandler = httpWithMiddleware<
  PathParams,
  InputUseProductCategoryDetailsModel,
  never
>({
  routePath: '/api/input-use-product-categories',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json({}, { status: HttpStatusCode.created }),
})
