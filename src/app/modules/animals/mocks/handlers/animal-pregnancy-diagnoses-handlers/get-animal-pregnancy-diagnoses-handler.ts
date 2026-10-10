import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { parseSearchParams, toSearchResponse } from '@/core/mocks/utils'

import animalPregnancyDiagnosesData from '@database/animalPregnancyDiagnosesData.json'

export const getAnimalPregnancyDiagnosesHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  never,
  never
>({
  routePath:
    '/api/properties/:propertyId/animals/:animalId/pregnancy-diagnoses/search',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const search = parseSearchParams(request)

    const animalPregnancyDiagnoses = animalPregnancyDiagnosesData.map(
      (item) => ({
        id: item.id,
        diagnoseDate: item.date,
        lastIa: item.lastInseminationDate,
      })
    )

    return HttpResponse.json(
      toSearchResponse(animalPregnancyDiagnoses, search),
      {
        status: HttpStatusCode.ok,
      }
    )
  },
})
