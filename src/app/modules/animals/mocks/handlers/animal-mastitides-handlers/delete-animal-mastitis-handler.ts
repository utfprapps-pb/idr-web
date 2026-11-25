import { HttpResponse, type PathParams } from 'msw'

import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import { notFoundProblem } from '../../utils/event-mock-rules'

import { animalMastitidesStore } from './animal-mastitides-store'

export const deleteAnimalMastitisHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  object
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/mastitides/:id',
  method: 'delete',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (
      !animalMastitidesStore.remove(String(params.animalId), String(params.id))
    ) {
      return notFoundProblem('Mastite não encontrada')
    }

    return HttpResponse.json(undefined, { status: 204 })
  },
})
