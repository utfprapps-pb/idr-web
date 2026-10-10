import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import animalPurchasesData from '@database/animalPurchasesData.json'

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
    if (!animalPurchasesData.length) {
      return HttpResponse.json({} as AnimalPurchaseApiResponse, {
        status: 404,
      })
    }

    const animalPurchaseFound = animalPurchasesData.find(
      (animal) => animal.id === params.id
    )

    if (!animalPurchaseFound) {
      return HttpResponse.json({} as AnimalPurchaseApiResponse, {
        status: 404,
      })
    }

    return HttpResponse.json(
      {
        id: animalPurchaseFound.id,
        animalId: String(params.animalId),
        weight: Number(animalPurchaseFound.weight),
        datePurchase: animalPurchaseFound.date,
        birthDate: animalPurchaseFound.birthDate,
        value: Number(animalPurchaseFound.price),
      },
      { status: HttpStatusCode.ok }
    )
  },
})
