import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { parseSearchParams, toSearchResponse } from '@/core/mocks/utils'

import animalMedicationsData from '@database/animalMedicationsData.json'

export const getAnimalMedicationsHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  never,
  never
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/medications/search',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const search = parseSearchParams(request)

    const animalMedications = animalMedicationsData.map((item) => ({
      id: item.id,
      applicationDate: item.date,
      appliedDose: item.appliedDose,
      applicationWay: item.applicationMethod,
      product: item.product,
      activeIngredient: item.activeIngredient,
    }))

    return HttpResponse.json(toSearchResponse(animalMedications, search), {
      status: HttpStatusCode.ok,
    })
  },
})
