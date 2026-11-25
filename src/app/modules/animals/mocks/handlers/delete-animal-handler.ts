import { HttpResponse, type PathParams } from 'msw'

import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import { notFoundProblem } from '../utils/event-mock-rules'

import { animalsStore } from './animals-store'

export const deleteAnimalHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'id'>,
  never,
  object
>({
  routePath: '/api/properties/:propertyId/animals/:id',
  method: 'delete',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!animalsStore.remove(String(params.id))) {
      return notFoundProblem('Animal não encontrado')
    }

    return HttpResponse.json(undefined, { status: 204 })
  },
})
