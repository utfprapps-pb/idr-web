import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

type UpdateRegionBody = { description: string }

export const updateRegionHandler = httpWithMiddleware<
  { id: string },
  UpdateRegionBody,
  never
>({
  routePath: '/api/v1/regions/:id',
  method: 'put',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request, params }) => {
    const body = await request.json()
    return HttpResponse.json(
      { id: params.id, description: body.description },
      { status: HttpStatusCode.ok }
    )
  },
})
