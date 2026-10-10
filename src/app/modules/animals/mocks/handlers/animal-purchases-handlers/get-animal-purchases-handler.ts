import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { paginateData, sortData } from '@/core/mocks/utils'

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
    const url = new URL(request.url)
    const terms = url.searchParams.get('terms') ?? ''
    const page = Number(url.searchParams.get('page') ?? 0)
    const perPage = Number(url.searchParams.get('perPage') ?? 10)
    const sort = url.searchParams.get('sort')
    const direction = url.searchParams.get('direction') ?? 'asc'

    // `weight` não existe no backend real — não é incluído na resposta.
    let animalPurchases = animalPurchasesData.map((item) => ({
      id: item.id,
      datePurchase: item.date,
      birthDate: item.birthDate,
      value: Number(item.price),
    }))

    if (terms) {
      animalPurchases = animalPurchases.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(terms.toLowerCase())
        )
      )
    }

    if (sort) {
      animalPurchases = sortData(
        {
          field: sort as keyof (typeof animalPurchases)[number],
          type: direction as 'asc' | 'desc',
        },
        animalPurchases
      )
    }

    const total = animalPurchases.length
    const items = paginateData({ page, perPage }, animalPurchases)

    return HttpResponse.json(
      { currentPage: page, perPage, total, items },
      { status: HttpStatusCode.ok }
    )
  },
})
