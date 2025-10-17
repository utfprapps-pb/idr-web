import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { filterData, sortData, paginateData } from '@/core/mocks/utils'

import generalCultivationDiseasesData from '@database/generalCultivationDiseasesData.json'

import type { GeneralCultivationDiseaseApiResponse } from '../../../domain/models/general-cultivation-diseases-model'
import type { MockParams } from '@/core/mocks/types/mock-params-type'
import type { MockResponse } from '@/core/mocks/types/mock-response-type'

export const getGeneralCultivationDiseasesHandler = httpWithMiddleware<
  PathParams<'propertyId'>,
  MockParams<GeneralCultivationDiseaseApiResponse>,
  MockResponse<GeneralCultivationDiseaseApiResponse[]>
>({
  routePath: '/api/general-cultivations/diseases/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, page, rows, sort } = await request.json()

    if (!generalCultivationDiseasesData.length) {
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

    let generalCultivationDiseases = generalCultivationDiseasesData.map(
      (disease) => ({
        id: disease.id,
        name: disease.name,
      })
    )

    if (filters)
      generalCultivationDiseases =
        filterData<GeneralCultivationDiseaseApiResponse>(
          filters,
          generalCultivationDiseases
        )
    if (sort)
      generalCultivationDiseases =
        sortData<GeneralCultivationDiseaseApiResponse>(
          sort,
          generalCultivationDiseases
        )

    const numberOfElements = generalCultivationDiseases.length
    generalCultivationDiseases =
      paginateData<GeneralCultivationDiseaseApiResponse>(
        { page, perPage: rows },
        generalCultivationDiseases
      )

    return HttpResponse.json(
      {
        content: generalCultivationDiseases,
        numberOfElements,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
