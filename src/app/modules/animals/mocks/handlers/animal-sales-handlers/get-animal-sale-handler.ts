import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import animalSalesData from '@database/animalSalesData.json'

import type { AnimalSaleDetailsApiResponse } from '../../../domain/models/animal-sales-model'

export const getAnimalSaleHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  AnimalSaleDetailsApiResponse
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/sales/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!animalSalesData.length) {
      return HttpResponse.json({} as AnimalSaleDetailsApiResponse, {
        status: 404,
      })
    }

    const animalSaleFound = animalSalesData.find(
      (animal) => animal.id === params.id
    )

    if (!animalSaleFound) {
      return HttpResponse.json({} as AnimalSaleDetailsApiResponse, {
        status: 404,
      })
    }

    return HttpResponse.json(
      {
        dateSale: animalSaleFound.date,
        reason: animalSaleFound.reason,
        destination: animalSaleFound.destination,
        value: Number(animalSaleFound.price),
      },
      { status: HttpStatusCode.ok }
    )
  },
})
