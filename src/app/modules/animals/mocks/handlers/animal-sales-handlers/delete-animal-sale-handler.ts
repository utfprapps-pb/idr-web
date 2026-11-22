import { HttpResponse, type PathParams } from 'msw'

import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import { notFoundProblem } from '../../utils/event-mock-rules'

import { animalSalesStore } from './animal-sales-store'

export const deleteAnimalSaleHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  object
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/sales/:id',
  method: 'delete',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!animalSalesStore.remove(String(params.animalId), String(params.id))) {
      return notFoundProblem('Venda não encontrada')
    }

    return HttpResponse.json(undefined, { status: 204 })
  },
})
