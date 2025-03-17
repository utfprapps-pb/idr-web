import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import machinesData from '@database/machineData.json'

export const getMachineHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'id'>,
  never,
  never
>({
  routePath: '/api/properties/:propertyId/machines/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!machinesData.length) {
      return HttpResponse.json(
        {},
        {
          status: 404,
        }
      )
    }

    const machineFound = machinesData.find(
      (machine) => machine.id === String(params.id)
    )

    if (!machineFound) {
      return HttpResponse.json(
        {},
        {
          status: 404,
        }
      )
    }

    return HttpResponse.json(machineFound, { status: HttpStatusCode.ok })
  },
})
