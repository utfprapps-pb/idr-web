import { faker } from '@faker-js/faker/locale/pt_BR'
import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import animalChildbirthsData from '@database/animalChildbirthsData.json'

export const getAnimalChildbirthHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  never
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/childbirths/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!animalChildbirthsData.length) {
      return HttpResponse.json(
        {},
        {
          status: 404,
        }
      )
    }

    const animalChildbirthFound = animalChildbirthsData.find(
      (animal) => animal.id === String(params.id)
    )

    if (!animalChildbirthFound) {
      return HttpResponse.json(
        {},
        {
          status: 404,
        }
      )
    }

    return HttpResponse.json(
      {
        date: animalChildbirthFound.date,
        gender: animalChildbirthFound.gender,
        weight: animalChildbirthFound.weight,
        condition: animalChildbirthFound.condition,
        breed: {
          label: animalChildbirthFound.breed,
          value: faker.string.uuid(),
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
