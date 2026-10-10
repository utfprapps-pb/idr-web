import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { parseSearchParams, toSearchResponse } from '@/core/mocks/utils'

import animalSalesData from '@database/animalSalesData.json'

import { toAnimalSaleApiResponse } from '../../utils/to-animal-sale-api-response'

export const getAnimalSalesHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  never,
  never
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/sales/search',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request, params }) => {
    const search = parseSearchParams(request)

    const animalSales = animalSalesData.map((sale) =>
      toAnimalSaleApiResponse(sale, String(params.animalId))
    )

    return HttpResponse.json(toSearchResponse(animalSales, search), {
      status: HttpStatusCode.ok,
    })
  },
})
