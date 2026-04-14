import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { DeleteInputUseProductUseCase } from '../../../domain/use-cases/input-use-products-use-cases'

export const deleteInputUseProductHandler = httpWithMiddleware<
  { id: string },
  Parameters<DeleteInputUseProductUseCase['execute']>[0],
  undefined
>({
  routePath: '/api/input-uses/products/:id',
  method: 'delete',
  middlewares: [withDelay(), withAuth],
  resolver: async () => {
    return HttpResponse.json(undefined, { status: HttpStatusCode.noContent })
  },
})
