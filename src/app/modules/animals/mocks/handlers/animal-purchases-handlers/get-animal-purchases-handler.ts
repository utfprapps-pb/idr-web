import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { parseSearchParams, toSearchResponse } from '@/core/mocks/utils'

import animalPurchasesData from '@database/animalPurchasesData.json'

export const getAnimalPurchasesHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  never,
  never
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/purchases/search',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const search = parseSearchParams(request)

    // `weight` não existe no backend real — não é incluído na resposta.
    const animalPurchases = animalPurchasesData.map((item) => ({
      id: item.id,
      datePurchase: item.date,
      birthDate: item.birthDate,
      value: Number(item.price),
    }))

    return HttpResponse.json(toSearchResponse(animalPurchases, search), {
      status: HttpStatusCode.ok,
    })
  },
})
