import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { filterData, sortData, paginateData } from '@/core/mocks/utils'

import machinesData from '@database/machinesData.json'

import type { MachineApiResponse } from '../../domain/models/machines-model'
import type { MockParams } from '@/core/mocks/types/mock-params-type'
import type { MockResponse } from '@/core/mocks/types/mock-response-type'

export const getMachinesHandler = httpWithMiddleware<
  PathParams<'propertyId'>,
  MockParams<MachineApiResponse>,
  MockResponse<MachineApiResponse[]>
>({
  routePath: '/api/properties/:propertyId/machines/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, page, rows, sort } = await request.json()

    if (!machinesData.length) {
      return HttpResponse.json(
        {
          content: [],
          numberOfElements: 0,
          pageable: {
            pageSize: 0,
          },
        },
        {
          status: 404,
        }
      )
    }

    let machines = machinesData as MachineApiResponse[]

    if (filters) machines = filterData<MachineApiResponse>(filters, machines)
    if (sort) machines = sortData<MachineApiResponse>(sort, machines)
    const numberOfElements = machines.length

    if (page)
      machines = paginateData<MachineApiResponse>(
        { page, perPage: rows },
        machines
      )

    return HttpResponse.json(
      {
        content: machines,
        numberOfElements,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
