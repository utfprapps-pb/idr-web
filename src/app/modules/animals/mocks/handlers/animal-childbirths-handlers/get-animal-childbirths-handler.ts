import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import {
  normalizeQueryFilters,
  filterData,
  sortData,
  paginateData,
} from '@/core/mocks/utils'

import animalChildBirthsData from '@database/animalChildBirthsData.json'

import type { AnimalChildBirthModel } from '../../../domain/models/animal-childbirths-model'

type Params = {
  filter: string
  sort: string
  pagination: string
}

type Response = {
  animalChildBirths: AnimalChildBirthModel[]
  totalRegisters: number
}

export const getAnimalChildBirthsHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  Params,
  Response
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/childbirths',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    if (!animalChildBirthsData.length) {
      return HttpResponse.json(
        {
          animalChildBirths: [],
          totalRegisters: 0,
        },
        {
          status: 404,
        }
      )
    }

    const url = new URL(request.url)
    const { pagination, filters, sort } = normalizeQueryFilters(url)

    let animalChildBirths = animalChildBirthsData as AnimalChildBirthModel[]

    if (filters)
      animalChildBirths = filterData<AnimalChildBirthModel>(
        filters,
        animalChildBirths
      )
    if (sort)
      animalChildBirths = sortData<AnimalChildBirthModel>(
        sort,
        animalChildBirths
      )
    const totalRegisters = animalChildBirths.length

    if (pagination)
      animalChildBirths = paginateData<AnimalChildBirthModel>(
        pagination,
        animalChildBirths
      )

    return HttpResponse.json(
      {
        animalChildBirths,
        totalRegisters,
      },
      { status: HttpStatusCode.ok }
    )
  },
})
