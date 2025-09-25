import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { filterData, sortData, paginateData } from '@/core/mocks/utils'

import animalSalesData from '@database/animalSalesData.json'

import type { AnimalSaleApiResponse } from '../../../domain/models/animal-sales-model'
import type { MockParams } from '@/core/mocks/types/mock-params-type'
import type { MockResponse } from '@/core/mocks/types/mock-response-type'

export const getAnimalSalesHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  MockParams<AnimalSaleApiResponse>,
  MockResponse<AnimalSaleApiResponse[]>
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/sales/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, page, rows, sort } = await request.json()

    if (!animalSalesData.length) {
      return HttpResponse.json(
        {
          content: [],
          numberOfElements: 0,
          pageable: {
            pageSize: 0,
          },
        },
        {
          status: 404,
        }
      )
    }

    let animalSales = animalSalesData

    if (filters)
      animalSales = filterData<AnimalSaleApiResponse>(filters, animalSales)
    if (sort) animalSales = sortData<AnimalSaleApiResponse>(sort, animalSales)

    const numberOfElements = animalSales.length
    animalSales = paginateData<AnimalSaleApiResponse>(
      { page, perPage: rows },
      animalSales
    )

    return HttpResponse.json(
      {
        content: animalSales,
        numberOfElements,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
