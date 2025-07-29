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

import animalChildbirthsData from '@database/animalChildbirthsData.json'

import type { AnimalChildbirthModel } from '../../../domain/models/animal-childbirths-model'

type Params = {
  filter: string
  sort: string
  pagination: string
}

type Response = {
  animalChildbirths: AnimalChildbirthModel[]
  totalRegisters: number
}

export const getAnimalChildbirthsHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  Params,
  Response
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/childbirths',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    if (!animalChildbirthsData.length) {
      return HttpResponse.json(
        {
          animalChildbirths: [],
          totalRegisters: 0,
        },
        {
          status: 404,
        }
      )
    }

    const url = new URL(request.url)
    const { pagination, filters, sort } = normalizeQueryFilters(url)

    let animalChildbirths = animalChildbirthsData as AnimalChildbirthModel[]

    if (filters)
      animalChildbirths = filterData<AnimalChildbirthModel>(
        filters,
        animalChildbirths
      )
    if (sort)
      animalChildbirths = sortData<AnimalChildbirthModel>(
        sort,
        animalChildbirths
      )
    const totalRegisters = animalChildbirths.length

    if (pagination)
      animalChildbirths = paginateData<AnimalChildbirthModel>(
        pagination,
        animalChildbirths
      )

    return HttpResponse.json(
      {
        animalChildbirths,
        totalRegisters,
      },
      { status: HttpStatusCode.ok }
    )
  },
})
