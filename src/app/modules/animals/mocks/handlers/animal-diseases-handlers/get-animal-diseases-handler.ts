import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { parseSearchParams, toSearchResponse } from '@/core/mocks/utils'

import animalDiseasesData from '@database/animalDiseasesData.json'

import { withAnimalId } from '../../utils/with-animal-id'

export const getAnimalDiseasesHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  never,
  never
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/diseases/search',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request, params }) => {
    const search = parseSearchParams(request)
    const items = animalDiseasesData.map((item) =>
      withAnimalId(item, String(params.animalId))
    )

    return HttpResponse.json(toSearchResponse(items, search), {
      status: HttpStatusCode.ok,
    })
  },
})
