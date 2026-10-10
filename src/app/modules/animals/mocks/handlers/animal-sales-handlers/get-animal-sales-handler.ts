import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { parseSearchParams, toSearchResponse } from '@/core/mocks/utils'

import animalSalesData from '@database/animalSalesData.json'

// Backend real fala em português — o seed/fixture local está em inglês,
// então traduzimos aqui para simular o contrato real.
const REASON_TO_BACKEND: Record<string, string> = {
  VOLUNTARY: 'VOLUNTARIA',
  DISCARD: 'DESCARTE',
  EMERGENCY: 'EMERGENCIA',
}

const DESTINATION_TO_BACKEND: Record<string, string> = {
  SLAUGHTER: 'ABATE',
  PRODUCTION: 'PRODUCAO',
}

export const getAnimalSalesHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  never,
  never
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/sales/search',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const search = parseSearchParams(request)

    // `weight` não existe no backend real — não é incluído na resposta.
    const animalSales = animalSalesData.map((item) => ({
      id: item.id,
      dateSale: item.date,
      value: Number(item.price),
      destination: DESTINATION_TO_BACKEND[item.destination] ?? item.destination,
      reason: REASON_TO_BACKEND[item.reason] ?? item.reason,
    }))

    return HttpResponse.json(toSearchResponse(animalSales, search), {
      status: HttpStatusCode.ok,
    })
  },
})
