import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { parseSearchParams, toSearchResponse } from '@/core/mocks/utils'

import animalDeathsData from '@database/animalDeathsData.json'

import { toAnimalDeathApiResponse } from '../../utils/to-animal-death-api-response'

export const getAnimalDeathsHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  never,
  never
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/deaths/search',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request, params }) => {
    const search = parseSearchParams(request)

    const animalDeaths = animalDeathsData.map((item) =>
      toAnimalDeathApiResponse(item, String(params.animalId))
    )

    return HttpResponse.json(toSearchResponse(animalDeaths, search), {
      status: HttpStatusCode.ok,
    })
  },
})
