import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/data/protocols/http'
import { httpWithMiddleware } from '@/mocks/lib'
import { withAuth, withDelay } from '@/mocks/middleware'

import animalsData from '@database/animalData.json'

export const getAnimalService = httpWithMiddleware<
  PathParams<'propertyId' | 'id'>,
  never,
  never
>({
  routePath: '/api/properties/:propertyId/animals/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!animalsData.length) {
      return HttpResponse.json(
        {},
        {
          status: 404,
        }
      )
    }

    const animalFound = animalsData.find(
      (forage) => forage.id === String(params.id)
    )

    if (!animalFound) {
      return HttpResponse.json(
        {},
        {
          status: 404,
        }
      )
    }

    return HttpResponse.json(animalFound, { status: HttpStatusCode.ok })
  },
})
