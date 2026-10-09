import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { paginateData, sortData } from '@/core/mocks/utils'

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
    const url = new URL(request.url)
    const terms = url.searchParams.get('terms') ?? ''
    const page = Number(url.searchParams.get('page') ?? 0)
    const perPage = Number(url.searchParams.get('perPage') ?? 10)
    const sort = url.searchParams.get('sort')
    const direction = url.searchParams.get('direction') ?? 'asc'

    // `weight` não existe no backend real — não é incluído na resposta.
    let animalSales = animalSalesData.map((item) => ({
      id: item.id,
      dateSale: item.date,
      value: item.price,
      destination: DESTINATION_TO_BACKEND[item.destination] ?? item.destination,
      reason: REASON_TO_BACKEND[item.reason] ?? item.reason,
    }))

    if (terms) {
      animalSales = animalSales.filter((item) =>
        JSON.stringify(item).toLowerCase().includes(terms.toLowerCase())
      )
    }

    if (sort) {
      animalSales = sortData(
        {
          field: sort as keyof (typeof animalSales)[number],
          type: direction as 'asc' | 'desc',
        },
        animalSales
      )
    }

    const total = animalSales.length
    const items = paginateData({ page, perPage }, animalSales)

    return HttpResponse.json(
      { currentPage: page, perPage, total, items },
      { status: HttpStatusCode.ok }
    )
  },
})
