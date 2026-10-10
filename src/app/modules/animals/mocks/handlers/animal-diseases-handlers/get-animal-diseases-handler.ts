import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { parseSearchParams, toSearchResponse } from '@/core/mocks/utils'

import animalDiseasesData from '@database/animalDiseasesData.json'

export const getAnimalDiseasesHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  never,
  never
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/diseases/search',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const search = parseSearchParams(request)

    const animalDiseases = animalDiseasesData.map((item) => ({
      id: item.id,
      diagnosis: item.diagnostic,
      diagnosisDate: item.diagnosticDate,
    }))

    return HttpResponse.json(toSearchResponse(animalDiseases, search), {
      status: HttpStatusCode.ok,
    })
  },
})
