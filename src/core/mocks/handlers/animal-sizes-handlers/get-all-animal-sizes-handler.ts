import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { parseSearchParams, toSearchResponse } from '@/core/mocks/utils'

import allAnimalSizesData from '@database/allAnimalSizesData.json'

import type { AnimalSizeApiResponse } from '@/core/domain/models/animal-sizes-model'

export const getAllAnimalSizesHandler = httpWithMiddleware<
  PathParams,
  never,
  never
>({
  routePath: '/api/animal-sizes/search',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const animalSizes: AnimalSizeApiResponse[] = allAnimalSizesData

    return HttpResponse.json(
      toSearchResponse(animalSizes, parseSearchParams(request)),
      { status: HttpStatusCode.ok }
    )
  },
})
