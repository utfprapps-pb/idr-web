import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/data/protocols/http'
import { httpWithMiddleware } from '@/mocks/lib'
import { withAuth, withDelay } from '@/mocks/middleware'
import {
  normalizeQueryFilters,
  paginateData,
  sortData,
  filterData,
} from '@/mocks/shared/'

import animalsData from '@database/animalData.json'

type Params = {
  filter: string
  sort: string
  pagination: string
}

type Animal = {
  id: string
  breed: string
}

type Response = {
  animals: Animal[]
  totalRegisters: number
}

export const getAnimalsService = httpWithMiddleware<
  PathParams<'propertyId'>,
  Params,
  Response
>({
  routePath: '/api/properties/:propertyId/animals',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    if (!animalsData.length) {
      return HttpResponse.json(
        {
          animals: [],
          totalRegisters: 0,
        },
        {
          status: 404,
        }
      )
    }

    const url = new URL(request.url)
    const { pagination, filters, sort } = normalizeQueryFilters(url)

    let animals = animalsData as Animal[]

    if (filters) animals = filterData<Animal>(filters, animals)
    if (sort) animals = sortData<Animal>(sort, animals)
    const totalRegisters = animals.length

    if (pagination) animals = paginateData<Animal>(pagination, animals)

    return HttpResponse.json(
      {
        animals,
        totalRegisters,
      },
      { status: HttpStatusCode.ok }
    )
  },
})
