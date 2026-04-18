import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { CreateInputUseProductUseCase } from '../../../domain/use-cases/input-use-products-use-cases'

export const createInputUseProductHandler = httpWithMiddleware<
  PathParams,
  Parameters<CreateInputUseProductUseCase['execute']>[0],
  undefined
>({
  routePath: '/api/input-uses/products',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async () => {
    return HttpResponse.json({}, { status: HttpStatusCode.created })
  },
})
