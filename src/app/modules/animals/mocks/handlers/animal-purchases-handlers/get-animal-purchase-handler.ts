import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import { notFoundProblem } from '../../utils/event-mock-rules'

import { animalPurchasesStore } from './animal-purchases-store'

import type { AnimalPurchaseApiResponse } from '../../../domain/models/animal-purchases-model'

export const getAnimalPurchaseHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  AnimalPurchaseApiResponse | object
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/purchases/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    const found = animalPurchasesStore.find(
      String(params.animalId),
      String(params.id)
    )

    if (!found) return notFoundProblem('Compra não encontrada')

    return HttpResponse.json(found, { status: HttpStatusCode.ok })
  },
})
