import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { paginateData, sortData } from '@/core/mocks/utils'

import animalMastitidesData from '@database/animalMastitidesData.json'

export const getAnimalMastitidesHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  never,
  never
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/mastitides/search',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const url = new URL(request.url)
    const terms = url.searchParams.get('terms') ?? ''
    const page = Number(url.searchParams.get('page') ?? 0)
    const perPage = Number(url.searchParams.get('perPage') ?? 10)
    const sort = url.searchParams.get('sort')
    const direction = url.searchParams.get('direction') ?? 'asc'

    let animalMastitides = animalMastitidesData.map((item) => ({
      id: item.id,
      diagnoseDate: item.date,
      mastitisType: item.type,
      ad: item.ad,
      ae: item.ae,
      pd: item.pd,
      pe: item.pe,
    }))

    if (terms) {
      animalMastitides = animalMastitides.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(terms.toLowerCase())
        )
      )
    }

    if (sort) {
      animalMastitides = sortData(
        {
          field: sort as keyof (typeof animalMastitides)[number],
          type: direction as 'asc' | 'desc',
        },
        animalMastitides
      )
    }

    const total = animalMastitides.length
    const items = paginateData({ page, perPage }, animalMastitides)

    return HttpResponse.json(
      { currentPage: page, perPage, total, items },
      { status: HttpStatusCode.ok }
    )
  },
})
