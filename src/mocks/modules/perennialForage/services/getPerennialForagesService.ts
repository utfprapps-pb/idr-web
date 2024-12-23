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

import perennialForagesData from '@database/perennialForagesData.json'

type Params = {
  filter: string
  sort: string
  pagination: string
}

type PerennialForage = {
  id: string
  cultivation: string
  area: string
  averageCost: string
  usefulLife: string
  formation: string
  type: 'OWNED_LAND' | 'LEASED_LAND'
  observation: string
}

type Response = {
  perennialForages: PerennialForage[]
  totalRegisters: number
}

export const getPerennialForagesService = httpWithMiddleware<
  PathParams<'propertyId'>,
  Params,
  Response
>({
  routePath: '/api/properties/:propertyId/perennial-forages',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    if (!perennialForagesData.length) {
      return HttpResponse.json(
        {
          perennialForages: [],
          totalRegisters: 0,
        },
        {
          status: 404,
        }
      )
    }

    const url = new URL(request.url)
    const { pagination, filters, sort } = normalizeQueryFilters(url)

    let perennialForages = perennialForagesData as PerennialForage[]

    if (filters)
      perennialForages = filterData<PerennialForage>(filters, perennialForages)
    if (sort)
      perennialForages = sortData<PerennialForage>(sort, perennialForages)
    const totalRegisters = perennialForages.length

    if (pagination)
      perennialForages = paginateData<PerennialForage>(
        pagination,
        perennialForages
      )

    return HttpResponse.json(
      {
        perennialForages,
        totalRegisters,
      },
      { status: HttpStatusCode.ok }
    )
  },
})
