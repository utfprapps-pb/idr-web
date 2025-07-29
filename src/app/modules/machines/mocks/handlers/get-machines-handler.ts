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

import machinesData from '@database/machineData.json'

type Params = {
  filter: string
  sort: string
  pagination: string
}

type Machine = {
  id: string
  name: string
  amount: number
  unitPrice: number
  percentDairyCattle: number
  usefulLife: number
  acquisitionDate: string
  moneyDairyCattle: number
}

type Response = {
  machines: Machine[]
  totalRegisters: number
}

export const getMachinesHandler = httpWithMiddleware<
  PathParams<'propertyId'>,
  Params,
  Response
>({
  routePath: '/api/properties/:propertyId/machines',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    if (!machinesData.length) {
      return HttpResponse.json(
        {
          machines: [],
          totalRegisters: 0,
        },
        {
          status: 404,
        }
      )
    }

    const url = new URL(request.url)
    const { pagination, filters, sort } = normalizeQueryFilters(url)

    let machines = machinesData as Machine[]

    if (filters) machines = filterData<Machine>(filters, machines)
    if (sort) machines = sortData<Machine>(sort, machines)
    const totalRegisters = machines.length

    if (pagination) machines = paginateData<Machine>(pagination, machines)

    return HttpResponse.json(
      {
        machines,
        totalRegisters,
      },
      { status: HttpStatusCode.ok }
    )
  },
})
