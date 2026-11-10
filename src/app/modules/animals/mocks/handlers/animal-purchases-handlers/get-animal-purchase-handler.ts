import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import animalPurchasesData from '@database/animalPurchasesData.json'

import { withAnimalId } from '../../utils/with-animal-id'

import type { AnimalPurchaseApiResponse } from '../../../domain/models/animal-purchases-model'

export const getAnimalPurchaseHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  AnimalPurchaseApiResponse
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/purchases/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    const found = animalPurchasesData.find((item) => item.id === params.id)

    if (!found) {
      return HttpResponse.json({} as AnimalPurchaseApiResponse, {
        status: HttpStatusCode.notFound,
      })
    }

    return HttpResponse.json(withAnimalId(found, String(params.animalId)), {
      status: HttpStatusCode.ok,
    })
  },
})
