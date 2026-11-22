import { HttpResponse, type PathParams } from 'msw'

import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import { notFoundProblem } from '../../utils/event-mock-rules'

import { animalPurchasesStore } from './animal-purchases-store'

export const deleteAnimalPurchaseHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  object
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/purchases/:id',
  method: 'delete',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (
      !animalPurchasesStore.remove(String(params.animalId), String(params.id))
    ) {
      return notFoundProblem('Compra não encontrada')
    }

    return HttpResponse.json(undefined, { status: 204 })
  },
})
