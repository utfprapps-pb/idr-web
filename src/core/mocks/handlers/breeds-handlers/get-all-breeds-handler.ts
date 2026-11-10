import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { parseSearchParams, toSearchResponse } from '@/core/mocks/utils'

import allBreedsData from '@database/allBreedsData.json'

import type { BreedApiResponse } from '@/core/domain/models/breeds-model'

export const getAllBreedsHandler = httpWithMiddleware<PathParams, never, never>(
  {
    routePath: '/api/breeds/search',
    method: 'get',
    middlewares: [withDelay(), withAuth],
    resolver: async ({ request }) => {
      const breeds: BreedApiResponse[] = allBreedsData

      return HttpResponse.json(
        toSearchResponse(breeds, parseSearchParams(request)),
        { status: HttpStatusCode.ok }
      )
    },
  }
)
