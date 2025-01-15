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

import improvementsData from '@database/improvementData.json'

type Params = {
  filter: string
  sort: string
  pagination: string
}

type Improvement = {
  id: string
  description: string
  amount: number
  unitPrice: number
  percentDairyCattle: number
  usefulLife: number
  acquisitionDate: string
  moneyDairyCattle: number
}

type Response = {
  improvements: Improvement[]
  totalRegisters: number
}

export const getImprovementsService = httpWithMiddleware<
  PathParams<'propertyId'>,
  Params,
  Response
>({
  routePath: '/api/properties/:propertyId/improvements',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    if (!improvementsData.length) {
      return HttpResponse.json(
        {
          improvements: [],
          totalRegisters: 0,
        },
        {
          status: 404,
        }
      )
    }

    const url = new URL(request.url)
    const { pagination, filters, sort } = normalizeQueryFilters(url)

    let improvements = improvementsData as Improvement[]

    if (filters) improvements = filterData<Improvement>(filters, improvements)
    if (sort) improvements = sortData<Improvement>(sort, improvements)
    const totalRegisters = improvements.length

    if (pagination)
      improvements = paginateData<Improvement>(pagination, improvements)

    return HttpResponse.json(
      {
        improvements,
        totalRegisters,
      },
      { status: HttpStatusCode.ok }
    )
  },
})
