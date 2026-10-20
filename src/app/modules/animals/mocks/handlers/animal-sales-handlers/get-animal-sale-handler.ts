import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import animalSalesData from '@database/animalSalesData.json'

import { withAnimalId } from '../../utils/with-animal-id'

import type { AnimalSaleApiResponse } from '../../../domain/models/animal-sales-model'

export const getAnimalSaleHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  AnimalSaleApiResponse
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/sales/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    const found = animalSalesData.find((item) => item.id === params.id)

    if (!found) {
      return HttpResponse.json({} as AnimalSaleApiResponse, {
        status: HttpStatusCode.notFound,
      })
    }

    return HttpResponse.json(withAnimalId(found, String(params.animalId)), {
      status: HttpStatusCode.ok,
    })
  },
})
