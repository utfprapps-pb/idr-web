import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import { notFoundProblem } from '../../utils/event-mock-rules'

import { animalSalesStore } from './animal-sales-store'

import type { AnimalSaleApiResponse } from '../../../domain/models/animal-sales-model'

export const getAnimalSaleHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  AnimalSaleApiResponse | object
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/sales/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    const found = animalSalesStore.find(
      String(params.animalId),
      String(params.id)
    )

    if (!found) return notFoundProblem('Venda não encontrada')

    return HttpResponse.json(found, { status: HttpStatusCode.ok })
  },
})
