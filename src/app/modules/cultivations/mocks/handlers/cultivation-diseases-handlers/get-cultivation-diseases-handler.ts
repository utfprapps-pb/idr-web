import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { filterData, sortData, paginateData } from '@/core/mocks/utils'

import cultivationDiseasesData from '@database/cultivationDiseasesData.json'

import type { CultivationDiseaseApiResponse } from '../../../domain/models/cultivation-diseases-model'
import type { MockParams } from '@/core/mocks/types/mock-params-type'
import type { MockResponse } from '@/core/mocks/types/mock-response-type'

export const getCultivationDiseasesHandler = httpWithMiddleware<
  PathParams<'propertyId'>,
  MockParams<CultivationDiseaseApiResponse>,
  MockResponse<CultivationDiseaseApiResponse[]>
>({
  routePath: '/api/properties/:propertyId/cultivations/diseases/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, page, rows, sort } = await request.json()

    if (!cultivationDiseasesData.length) {
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

    let cultivationDiseases = cultivationDiseasesData.map((disease) => ({
      id: disease.id,
      cultivation: disease.cultivation.name,
      disease: disease.disease.name,
      infestationType: disease.infestationType,
    }))

    if (filters)
      cultivationDiseases = filterData<CultivationDiseaseApiResponse>(
        filters,
        cultivationDiseases
      )
    if (sort)
      cultivationDiseases = sortData<CultivationDiseaseApiResponse>(
        sort,
        cultivationDiseases
      )

    const numberOfElements = cultivationDiseases.length
    cultivationDiseases = paginateData<CultivationDiseaseApiResponse>(
      { page, perPage: rows },
      cultivationDiseases
    )

    return HttpResponse.json(
      {
        content: cultivationDiseases,
        numberOfElements,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
