import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { paginateData, sortData } from '@/core/mocks/utils'

import animalsData from '@database/animalsData.json'

/** Formato real do `ListAnimalOutput`: `breedId` plano (UUID), sem objeto `breed` aninhado. */
type AnimalListApiResponse = {
  id: string
  identifier: string
  breedId: string
  currentWeight: number | null
  ecc: number | null
}

export const getAnimalsHandler = httpWithMiddleware<
  PathParams<'propertyId'>,
  never,
  never
>({
  routePath: '/api/properties/:propertyId/animals/search',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const url = new URL(request.url)
    const terms = url.searchParams.get('terms') ?? ''
    const page = Number(url.searchParams.get('page') ?? 0)
    const perPage = Number(url.searchParams.get('perPage') ?? 10)
    const sort = url.searchParams.get('sort')
    const direction = url.searchParams.get('direction') ?? 'asc'

    let animals = animalsData as AnimalListApiResponse[]

    if (terms) {
      animals = animals.filter((animal) =>
        animal.identifier.toLowerCase().includes(terms.toLowerCase())
      )
    }

    if (sort) {
      animals = sortData(
        {
          field: sort as keyof AnimalListApiResponse,
          type: direction as 'asc' | 'desc',
        },
        animals
      )
    }

    const total = animals.length
    const items = paginateData({ page, perPage }, animals)

    return HttpResponse.json(
      { currentPage: page, perPage, total, items },
      { status: HttpStatusCode.ok }
    )
  },
})
