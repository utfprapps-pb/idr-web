import { HttpResponse, type PathParams } from 'msw'

import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

export const deleteAnimalChildbirthHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  never
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/childbirths/:id',
  method: 'delete',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json(undefined, {
      status: 204,
    }),
})
