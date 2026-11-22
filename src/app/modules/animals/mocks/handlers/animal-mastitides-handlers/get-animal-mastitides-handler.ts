import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'
import { parseSearchParams, toSearchResponse } from '@/core/mocks/utils'

import { matchesEventDate } from '../../utils/event-mock-rules'

import { animalMastitidesStore } from './animal-mastitides-store'

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
    const items = animalMastitidesStore.list(String(params.animalId))

    return HttpResponse.json(
      toSearchResponse(
        items,
        search,
        matchesEventDate<(typeof items)[number]>('diagnoseDate')
      ),
      { status: HttpStatusCode.ok }
    )
  },
})
