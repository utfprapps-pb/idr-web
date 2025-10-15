import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { filterData, sortData, paginateData } from '@/core/mocks/utils'

import vegetableDiseasesData from '@database/vegetableDiseasesData.json'

import type { VegetableDiseaseApiResponse } from '../../../domain/models/vegetable-diseases-model'
import type { MockParams } from '@/core/mocks/types/mock-params-type'
import type { MockResponse } from '@/core/mocks/types/mock-response-type'

export const getVegetableDiseasesHandler = httpWithMiddleware<
  PathParams<'propertyId'>,
  MockParams<VegetableDiseaseApiResponse>,
  MockResponse<VegetableDiseaseApiResponse[]>
>({
  routePath: '/api/properties/:propertyId/vegetables/diseases/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, page, rows, sort } = await request.json()

    if (!vegetableDiseasesData.length) {
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

    let vegetableDiseases = vegetableDiseasesData.map((disease) => ({
      id: disease.id,
      vegetable: disease.vegetable.name,
      disease: disease.disease.name,
      infestationType: disease.infestationType,
    }))

    if (filters)
      vegetableDiseases = filterData<VegetableDiseaseApiResponse>(
        filters,
        vegetableDiseases
      )
    if (sort)
      vegetableDiseases = sortData<VegetableDiseaseApiResponse>(
        sort,
        vegetableDiseases
      )

    const numberOfElements = vegetableDiseases.length
    vegetableDiseases = paginateData<VegetableDiseaseApiResponse>(
      { page, perPage: rows },
      vegetableDiseases
    )

    return HttpResponse.json(
      {
        content: vegetableDiseases,
        numberOfElements,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
