import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { InputUseProductCategoryApiResponse } from '@/app/modules/input-uses/domain/models/input-use-product-categories-model'

export const updateInputUseProductCategoryHandler = httpWithMiddleware<
  PathParams<'id'>,
  Omit<InputUseProductCategoryApiResponse, 'id'>,
  never
>({
  routePath: '/api/input-use-product-categories/:id',
  method: 'patch',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json(undefined, { status: HttpStatusCode.noContent }),
})
