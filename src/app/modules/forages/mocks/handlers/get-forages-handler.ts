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

import foragesData from '@database/forageData.json'

type Params = {
  filter: string
  sort: string
  pagination: string
}

type Forage = {
  id: string
  cultivation: string
  area: string
  averageCost: string
  usefulLife: string
  formation: string
  ownershipType: 'OWNED_LAND' | 'LEASED_LAND'
  growthCycle: 'ANNUAL' | 'PERENNIAL'
  observation: string
}

type Response = {
  forages: Forage[]
  totalRegisters: number
}

export const getForagesHandler = httpWithMiddleware<
  PathParams<'propertyId'>,
  Params,
  Response
>({
  routePath: '/api/properties/:propertyId/forages',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    if (!foragesData.length) {
      return HttpResponse.json(
        {
          forages: [],
          totalRegisters: 0,
        },
        {
          status: 404,
        }
      )
    }

    const url = new URL(request.url)
    const { pagination, filters, sort } = normalizeQueryFilters(url)

    let forages = foragesData as Forage[]

    if (filters) forages = filterData<Forage>(filters, forages)
    if (sort) forages = sortData<Forage>(sort, forages)
    const totalRegisters = forages.length

    if (pagination) forages = paginateData<Forage>(pagination, forages)

    return HttpResponse.json(
      {
        forages,
        totalRegisters,
      },
      { status: HttpStatusCode.ok }
    )
  },
})
