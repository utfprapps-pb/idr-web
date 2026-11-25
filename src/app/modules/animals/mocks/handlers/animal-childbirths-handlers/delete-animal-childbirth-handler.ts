import { HttpResponse, type PathParams } from 'msw'

import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import { notFoundProblem } from '../../utils/event-mock-rules'

import { animalChildbirthsStore } from './animal-childbirths-store'

export const deleteAnimalChildbirthHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  object
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/childbirths/:id',
  method: 'delete',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (
      !animalChildbirthsStore.remove(String(params.animalId), String(params.id))
    ) {
      return notFoundProblem('Parto não encontrado')
    }

    return HttpResponse.json(undefined, { status: 204 })
  },
})
