import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import generalCultivationDiseasesData from '@database/generalCultivationDiseasesData.json'

import type { GeneralCultivationDiseaseDetailsApiResponse } from '../../../domain/models/general-cultivation-diseases-model'

export const getGeneralCultivationDiseaseHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'id'>,
  never,
  GeneralCultivationDiseaseDetailsApiResponse
>({
  routePath: '/api/general-cultivations/diseases/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!generalCultivationDiseasesData.length) {
      return HttpResponse.json(
        {} as GeneralCultivationDiseaseDetailsApiResponse,
        {
          status: 404,
        }
      )
    }

    const generalCultivationDiseasesFound = generalCultivationDiseasesData.find(
      (generalCultivation) => generalCultivation.id === Number(params.id)
    )

    if (!generalCultivationDiseasesFound) {
      return HttpResponse.json(
        {} as GeneralCultivationDiseaseDetailsApiResponse,
        {
          status: 404,
        }
      )
    }

    return HttpResponse.json(generalCultivationDiseasesFound, {
      status: HttpStatusCode.ok,
    })
  },
})
