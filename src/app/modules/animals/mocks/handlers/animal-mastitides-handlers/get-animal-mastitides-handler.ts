import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { parseSearchParams, toSearchResponse } from '@/core/mocks/utils'

import animalMastitidesData from '@database/animalMastitidesData.json'

export const getAnimalMastitidesHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  never,
  never
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/mastitides/search',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const search = parseSearchParams(request)

    const animalMastitides = animalMastitidesData.map((item) => ({
      id: item.id,
      diagnoseDate: item.date,
      mastitisType: item.type,
      ad: item.ad,
      ae: item.ae,
      pd: item.pd,
      pe: item.pe,
    }))

    return HttpResponse.json(toSearchResponse(animalMastitides, search), {
      status: HttpStatusCode.ok,
    })
  },
})
