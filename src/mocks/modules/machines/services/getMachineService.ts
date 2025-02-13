import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/data/protocols/http'
import { httpWithMiddleware } from '@/mocks/lib'
import { withAuth, withDelay } from '@/mocks/middleware'

import machinesData from '@database/machineData.json'

export const getMachineService = httpWithMiddleware<
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
