import { HttpResponse, type PathParams } from 'msw'

import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import { notFoundProblem } from '../../utils/event-mock-rules'

import { animalInseminationsStore } from './animal-inseminations-store'

export const deleteAnimalInseminationHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  object
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/inseminations/:id',
  method: 'delete',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (
      !animalInseminationsStore.remove(
        String(params.animalId),
        String(params.id)
      )
    ) {
      return notFoundProblem('Inseminação não encontrada')
    }

    return HttpResponse.json(undefined, { status: 204 })
  },
})
