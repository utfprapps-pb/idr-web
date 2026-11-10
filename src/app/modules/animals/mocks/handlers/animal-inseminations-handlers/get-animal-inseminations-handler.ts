import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { parseSearchParams, toSearchResponse } from '@/core/mocks/utils'

import animalInseminationsData from '@database/animalInseminationsData.json'

import { withAnimalId } from '../../utils/with-animal-id'

export const getAnimalInseminationsHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  never,
  never
>({
  routePath:
    '/api/properties/:propertyId/animals/:animalId/inseminations/search',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request, params }) => {
    const search = parseSearchParams(request)
    const items = animalInseminationsData.map((item) =>
      withAnimalId(item, String(params.animalId))
    )

    return HttpResponse.json(toSearchResponse(items, search), {
      status: HttpStatusCode.ok,
    })
  },
})
