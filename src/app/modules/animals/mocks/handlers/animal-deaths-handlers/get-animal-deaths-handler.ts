import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'
import { parseSearchParams, toSearchResponse } from '@/core/mocks/utils'

import { matchesEventDate } from '../../utils/event-mock-rules'

import { animalDeathsStore } from './animal-deaths-store'

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
    const items = animalDeathsStore.list(String(params.animalId))

    return HttpResponse.json(
      toSearchResponse(
        items,
        search,
        matchesEventDate<(typeof items)[number]>('deathDate')
      ),
      { status: HttpStatusCode.ok }
    )
  },
})
