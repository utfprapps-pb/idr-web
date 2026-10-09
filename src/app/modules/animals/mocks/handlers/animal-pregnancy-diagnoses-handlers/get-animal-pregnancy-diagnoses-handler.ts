import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { paginateData, sortData } from '@/core/mocks/utils'

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
    const url = new URL(request.url)
    const terms = url.searchParams.get('terms') ?? ''
    const page = Number(url.searchParams.get('page') ?? 0)
    const perPage = Number(url.searchParams.get('perPage') ?? 10)
    const sort = url.searchParams.get('sort')
    const direction = url.searchParams.get('direction') ?? 'asc'

    let animalPregnancyDiagnoses = animalPregnancyDiagnosesData.map((item) => ({
      id: item.id,
      diagnoseDate: item.date,
      lastIa: item.lastInseminationDate,
    }))

    if (terms) {
      animalPregnancyDiagnoses = animalPregnancyDiagnoses.filter((item) =>
        JSON.stringify(item).toLowerCase().includes(terms.toLowerCase())
      )
    }

    if (sort) {
      animalPregnancyDiagnoses = sortData(
        {
          field: sort as keyof (typeof animalPregnancyDiagnoses)[number],
          type: direction as 'asc' | 'desc',
        },
        animalPregnancyDiagnoses
      )
    }

    const total = animalPregnancyDiagnoses.length
    const items = paginateData({ page, perPage }, animalPregnancyDiagnoses)

    return HttpResponse.json(
      { currentPage: page, perPage, total, items },
      { status: HttpStatusCode.ok }
    )
  },
})
