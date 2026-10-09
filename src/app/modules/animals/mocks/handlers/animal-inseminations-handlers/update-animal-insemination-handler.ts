import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

export const updateAnimalInseminationHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  { date: string; bull: unknown },
  never
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/inseminations/:id',
  method: 'put',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request, params }) => {
    const body = await request.json()

    return HttpResponse.json(
      { id: params.id, date: body.date, bull: body.bull },
      { status: HttpStatusCode.ok }
    )
  },
})
