import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

export const updateAnimalSaleHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  Record<string, unknown>,
  never
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/sales/:id',
  method: 'put',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request, params }) => {
    const body = await request.json()

    return HttpResponse.json(
      { id: params.id, ...body },
      { status: HttpStatusCode.ok }
    )
  },
})
