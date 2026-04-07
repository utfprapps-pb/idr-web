import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { ProductCategoryDetailsModel } from '@/app/modules/input-uses/domain/models/product-categories-model'

export const createProductCategoryHandler = httpWithMiddleware<
  PathParams,
  ProductCategoryDetailsModel,
  never
>({
  routePath: '/api/product-categories',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json({}, { status: HttpStatusCode.created }),
})
