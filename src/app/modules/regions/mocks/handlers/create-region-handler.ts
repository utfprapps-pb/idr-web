import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

type CreateRegionBody = { description: string }

export const createRegionHandler = httpWithMiddleware<
  never,
  CreateRegionBody,
  never
>({
  routePath: '/api/v1/regions',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json(
      { id: crypto.randomUUID(), description: body.description },
      { status: HttpStatusCode.ok }
    )
  },
})
