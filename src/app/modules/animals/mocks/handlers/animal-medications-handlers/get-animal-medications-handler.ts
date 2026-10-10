import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { paginateData, sortData } from '@/core/mocks/utils'

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
    const url = new URL(request.url)
    const terms = url.searchParams.get('terms') ?? ''
    const page = Number(url.searchParams.get('page') ?? 0)
    const perPage = Number(url.searchParams.get('perPage') ?? 10)
    const sort = url.searchParams.get('sort')
    const direction = url.searchParams.get('direction') ?? 'asc'

    let animalMedications = animalMedicationsData.map((item) => ({
      id: item.id,
      applicationDate: item.date,
      appliedDose: item.appliedDose,
      applicationWay: item.applicationMethod,
      product: item.product,
      activeIngredient: item.activeIngredient,
    }))

    if (terms) {
      animalMedications = animalMedications.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(terms.toLowerCase())
        )
      )
    }

    if (sort) {
      animalMedications = sortData(
        {
          field: sort as keyof (typeof animalMedications)[number],
          type: direction as 'asc' | 'desc',
        },
        animalMedications
      )
    }

    const total = animalMedications.length
    const items = paginateData({ page, perPage }, animalMedications)

    return HttpResponse.json(
      { currentPage: page, perPage, total, items },
      { status: HttpStatusCode.ok }
    )
  },
})
