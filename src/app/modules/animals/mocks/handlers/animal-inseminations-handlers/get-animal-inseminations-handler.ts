import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { parseSearchParams, toSearchResponse } from '@/core/mocks/utils'

import animalInseminationsData from '@database/animalInseminationsData.json'

export const getAnimalInseminationsHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  never,
  never
>({
  routePath:
    '/api/properties/:propertyId/animals/:animalId/inseminations/search',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const search = parseSearchParams(request)

    const animalInseminations = animalInseminationsData.map((item) => ({
      id: item.id,
      iaDate: item.date,
      bull: item.sire,
    }))

    return HttpResponse.json(toSearchResponse(animalInseminations, search), {
      status: HttpStatusCode.ok,
    })
  },
})
