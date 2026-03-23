import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import generalCultivationPestsData from '@database/generalCultivationPestsData.json'

import type { GeneralCultivationPestDetailsApiResponse } from '../../../domain/models/general-cultivation-pests-model'

export const getGeneralCultivationPestHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'id'>,
  never,
  GeneralCultivationPestDetailsApiResponse
>({
  routePath: '/api/general-cultivations/pests/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!generalCultivationPestsData.length) {
      return HttpResponse.json({} as GeneralCultivationPestDetailsApiResponse, {
        status: 404,
      })
    }

    const generalCultivationPestsFound = generalCultivationPestsData.find(
      (generalCultivationPest) =>
        generalCultivationPest.id === Number(params.id)
    )

    if (!generalCultivationPestsFound) {
      return HttpResponse.json({} as GeneralCultivationPestDetailsApiResponse, {
        status: 404,
      })
    }

    return HttpResponse.json(generalCultivationPestsFound, {
      status: HttpStatusCode.ok,
    })
  },
})
