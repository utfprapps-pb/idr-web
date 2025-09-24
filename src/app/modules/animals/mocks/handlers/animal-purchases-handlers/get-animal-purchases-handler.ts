import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { filterData, sortData, paginateData } from '@/core/mocks/utils'

import animalPurchasesData from '@database/animalPurchasesData.json'

import type { AnimalPurchaseApiResponse } from '../../../domain/models/animal-purchases-model'
import type { MockParams } from '@/core/mocks/types/mock-params-type'
import type { MockResponse } from '@/core/mocks/types/mock-response-type'

export const getAnimalPurchasesHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  MockParams<AnimalPurchaseApiResponse>,
  MockResponse<AnimalPurchaseApiResponse[]>
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/purchases/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, page, rows, sort } = await request.json()

    if (!animalPurchasesData.length) {
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

    let animalPurchases = animalPurchasesData

    if (filters)
      animalPurchases = filterData<AnimalPurchaseApiResponse>(
        filters,
        animalPurchases
      )
    if (sort)
      animalPurchases = sortData<AnimalPurchaseApiResponse>(
        sort,
        animalPurchases
      )

    const numberOfElements = animalPurchases.length
    animalPurchases = paginateData<AnimalPurchaseApiResponse>(
      { page, perPage: rows },
      animalPurchases
    )

    return HttpResponse.json(
      {
        content: animalPurchases,
        numberOfElements,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
