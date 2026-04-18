import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import type { InputUseProductApiResponse } from '../../../domain/models/input-use-products-model'
import type { PathParam } from 'react-router-dom'

export const updateInputUseProductHandler = httpWithMiddleware<
  PathParam<'id'>,
  Omit<InputUseProductApiResponse, 'id'>,
  never
>({
  routePath: '/api/input-uses/products/:id',
  method: 'patch',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json(undefined, {
      status: HttpStatusCode.noContent,
    }),
})
