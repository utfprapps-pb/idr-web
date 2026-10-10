import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { paginateData, sortData } from '@/core/mocks/utils'

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
    const url = new URL(request.url)
    const terms = url.searchParams.get('terms') ?? ''
    const page = Number(url.searchParams.get('page') ?? 0)
    const perPage = Number(url.searchParams.get('perPage') ?? 10)
    const sort = url.searchParams.get('sort')
    const direction = url.searchParams.get('direction') ?? 'asc'

    let animalDiseases = animalDiseasesData.map((item) => ({
      id: item.id,
      diagnosis: item.diagnostic,
      diagnosisDate: item.diagnosticDate,
    }))

    if (terms) {
      animalDiseases = animalDiseases.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(terms.toLowerCase())
        )
      )
    }

    if (sort) {
      animalDiseases = sortData(
        {
          field: sort as keyof (typeof animalDiseases)[number],
          type: direction as 'asc' | 'desc',
        },
        animalDiseases
      )
    }

    const total = animalDiseases.length
    const items = paginateData({ page, perPage }, animalDiseases)

    return HttpResponse.json(
      { currentPage: page, perPage, total, items },
      { status: HttpStatusCode.ok }
    )
  },
})
