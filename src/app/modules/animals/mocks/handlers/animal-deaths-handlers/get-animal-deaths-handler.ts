import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { parseSearchParams, toSearchResponse } from '@/core/mocks/utils'

import animalDeathsData from '@database/animalDeathsData.json'

export const getAnimalDeathsHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  never,
  never
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/deaths/search',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const search = parseSearchParams(request)

    const animalDeaths = animalDeathsData.map((item) => ({
      id: item.id,
      reason: item.reason,
      deathDate: item.date,
    }))

    return HttpResponse.json(toSearchResponse(animalDeaths, search), {
      status: HttpStatusCode.ok,
    })
  },
})
