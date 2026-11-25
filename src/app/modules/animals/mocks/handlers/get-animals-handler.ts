import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { parseSearchParams, toSearchResponse } from '@/core/mocks/utils'

import { animalsStore } from './animals-store'

export const getAnimalsHandler = httpWithMiddleware<
  PathParams<'propertyId'>,
  never,
  never
>({
  routePath: '/api/properties/:propertyId/animals/search',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request, params }) => {
    const search = parseSearchParams(request)
    const animals = animalsStore.list(String(params.propertyId))

    return HttpResponse.json(
      toSearchResponse(animals, search, (animal, terms) =>
        animal.identifier.toLowerCase().includes(terms.toLowerCase())
      ),
      { status: HttpStatusCode.ok }
    )
  },
})
