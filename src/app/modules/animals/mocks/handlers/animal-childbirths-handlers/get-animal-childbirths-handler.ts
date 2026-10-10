import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { parseSearchParams, toSearchResponse } from '@/core/mocks/utils'

import animalChildbirthsData from '@database/animalChildbirthsData.json'

import { toAnimalChildbirthApiResponse } from '../../utils/to-animal-childbirth-api-response'

export const getAnimalChildbirthsHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  never,
  never
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/childbirths/search',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request, params }) => {
    const search = parseSearchParams(request)

    const animalChildbirths = animalChildbirthsData.map((item) =>
      toAnimalChildbirthApiResponse(item, String(params.animalId))
    )

    return HttpResponse.json(toSearchResponse(animalChildbirths, search), {
      status: HttpStatusCode.ok,
    })
  },
})
