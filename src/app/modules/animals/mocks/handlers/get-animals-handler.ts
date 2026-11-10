import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { parseSearchParams, toSearchResponse } from '@/core/mocks/utils'

import animalsData from '@database/animalsData.json'

import { toAnimalApiResponse } from '../utils/to-animal-api-response'

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
    const animals = animalsData.map((animal) =>
      toAnimalApiResponse(animal, String(params.propertyId))
    )

    return HttpResponse.json(
      toSearchResponse(animals, search, (animal, terms) =>
        animal.identifier.toLowerCase().includes(terms.toLowerCase())
      ),
      { status: HttpStatusCode.ok }
    )
  },
})
