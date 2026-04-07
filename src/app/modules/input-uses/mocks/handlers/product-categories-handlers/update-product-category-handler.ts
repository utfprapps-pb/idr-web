import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { ProductCategoryApiResponse } from '@/app/modules/input-uses/domain/models/product-categories-model'

export const updateProductCategoryHandler = httpWithMiddleware<
  PathParams<'id'>,
  Omit<ProductCategoryApiResponse, 'id'>,
  never
>({
  routePath: '/api/product-categories/:id',
  method: 'patch',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json(undefined, { status: HttpStatusCode.noContent }),
})
