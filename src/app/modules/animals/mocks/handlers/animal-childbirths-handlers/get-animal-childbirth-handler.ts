import { faker } from '@faker-js/faker/locale/pt_BR'
import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import animalChildBirthsData from '@database/animalChildBirthsData.json'

export const getAnimalChildBirthHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  never
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/childbirths/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!animalChildBirthsData.length) {
      return HttpResponse.json(
        {},
        {
          status: 404,
        }
      )
    }

    const animalChildBirthFound = animalChildBirthsData.find(
      (animal) => animal.id === String(params.id)
    )

    if (!animalChildBirthFound) {
      return HttpResponse.json(
        {},
        {
          status: 404,
        }
      )
    }

    return HttpResponse.json(
      {
        date: animalChildBirthFound.date,
        gender: animalChildBirthFound.gender,
        weight: animalChildBirthFound.weight,
        condition: animalChildBirthFound.condition,
        breed: {
          label: animalChildBirthFound.breed,
          value: faker.string.uuid(),
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
