import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import cultivationDiseasesData from '@database/cultivationDiseasesData.json'

import type { CultivationDiseaseDetailsApiResponse } from '../../../domain/models/cultivation-diseases-model'

export const getCultivationDiseaseHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'id'>,
  never,
  CultivationDiseaseDetailsApiResponse
>({
  routePath: '/api/properties/:propertyId/cultivations/diseases/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!cultivationDiseasesData.length) {
      return HttpResponse.json({} as CultivationDiseaseDetailsApiResponse, {
        status: 404,
      })
    }

    const cultivationDiseaseFound = cultivationDiseasesData.find(
      (cultivation) => cultivation.id === Number(params.id)
    )

    if (!cultivationDiseaseFound) {
      return HttpResponse.json({} as CultivationDiseaseDetailsApiResponse, {
        status: 404,
      })
    }

    return HttpResponse.json(cultivationDiseaseFound, {
      status: HttpStatusCode.ok,
    })
  },
})
