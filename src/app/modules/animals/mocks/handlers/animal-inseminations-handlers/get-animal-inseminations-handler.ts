import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { paginateData, sortData } from '@/core/mocks/utils'

import animalInseminationsData from '@database/animalInseminationsData.json'

export const getAnimalInseminationsHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  never,
  never
>({
  routePath:
    '/api/properties/:propertyId/animals/:animalId/inseminations/search',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const url = new URL(request.url)
    const terms = url.searchParams.get('terms') ?? ''
    const page = Number(url.searchParams.get('page') ?? 0)
    const perPage = Number(url.searchParams.get('perPage') ?? 10)
    const sort = url.searchParams.get('sort')
    const direction = url.searchParams.get('direction') ?? 'asc'

    let animalInseminations = animalInseminationsData.map((item) => ({
      id: item.id,
      date: item.date,
      bull: item.sire,
    }))

    if (terms) {
      animalInseminations = animalInseminations.filter((item) =>
        JSON.stringify(item).toLowerCase().includes(terms.toLowerCase())
      )
    }

    if (sort) {
      animalInseminations = sortData(
        {
          field: sort as keyof (typeof animalInseminations)[number],
          type: direction as 'asc' | 'desc',
        },
        animalInseminations
      )
    }

    const total = animalInseminations.length
    const items = paginateData({ page, perPage }, animalInseminations)

    return HttpResponse.json(
      { currentPage: page, perPage, total, items },
      { status: HttpStatusCode.ok }
    )
  },
})
