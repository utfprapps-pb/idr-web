import { HttpResponse, type PathParams } from 'msw'

import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import { notFoundProblem } from '../../utils/event-mock-rules'

import { animalDeathsStore } from './animal-deaths-store'

export const deleteAnimalDeathHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  object
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/deaths/:id',
  method: 'delete',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!animalDeathsStore.remove(String(params.animalId), String(params.id))) {
      return notFoundProblem('Óbito não encontrado')
    }

    return HttpResponse.json(undefined, { status: 204 })
  },
})
