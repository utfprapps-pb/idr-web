import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { parseSearchParams, toSearchResponse } from '@/core/mocks/utils'

import animalMastitidesData from '@database/animalMastitidesData.json'

import { withAnimalId } from '../../utils/with-animal-id'

export const getAnimalMastitidesHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  never,
  never
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/mastitides/search',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request, params }) => {
    const search = parseSearchParams(request)
    const items = animalMastitidesData.map((item) =>
      withAnimalId(item, String(params.animalId))
    )

    return HttpResponse.json(toSearchResponse(items, search), {
      status: HttpStatusCode.ok,
    })
  },
})
