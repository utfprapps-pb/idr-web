import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import animalPurchasesData from '@database/animalPurchasesData.json'

import type { AnimalPurchaseDetailsApiResponse } from '../../../domain/models/animal-purchases-model'

export const getAnimalPurchaseHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  AnimalPurchaseDetailsApiResponse
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/purchases/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!animalPurchasesData.length) {
      return HttpResponse.json({} as AnimalPurchaseDetailsApiResponse, {
        status: 404,
      })
    }

    const animalPurchaseFound = animalPurchasesData.find(
      (animal) => animal.id === Number(params.id)
    )

    if (!animalPurchaseFound) {
      return HttpResponse.json({} as AnimalPurchaseDetailsApiResponse, {
        status: 404,
      })
    }

    return HttpResponse.json(
      {
        date: animalPurchaseFound.date,
        birthDate: animalPurchaseFound.birthDate,
        weight: animalPurchaseFound.weight,
        price: animalPurchaseFound.price,
      },
      { status: HttpStatusCode.ok }
    )
  },
})
