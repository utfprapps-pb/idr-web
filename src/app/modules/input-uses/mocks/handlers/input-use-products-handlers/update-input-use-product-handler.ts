import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { UpdateInputUseProductUseCase } from '../../../domain/use-cases/input-use-products-use-cases'

export const updateInputUseProductHandler = httpWithMiddleware<
  { id: string },
  Parameters<UpdateInputUseProductUseCase['execute']>[0],
  undefined
>({
  routePath: '/api/input-uses/products/:id',
  method: 'patch',
  middlewares: [withDelay(), withAuth],
  resolver: async () => {
    return HttpResponse.json(null, { status: HttpStatusCode.noContent })
  },
})
