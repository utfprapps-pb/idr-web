import { faker } from '@faker-js/faker/locale/pt_BR'
import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import animalsData from '@database/animalsData.json'

import type { AnimalDetailsApiResponse } from '../../domain/models/animals-model'

export const getAnimalHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'id'>,
  never,
  AnimalDetailsApiResponse
>({
  routePath: '/api/properties/:propertyId/animals/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!animalsData.length) {
      return HttpResponse.json({} as AnimalDetailsApiResponse, {
        status: 404,
      })
    }

    const animalFound = animalsData.find(
      (animal) => animal.id === Number(params.id)
    )

    if (!animalFound) {
      return HttpResponse.json({} as AnimalDetailsApiResponse, {
        status: 404,
      })
    }

    return HttpResponse.json(
      {
        name: animalFound.name,
        breed: {
          label: animalFound.breed,
          value: faker.number.int({ min: 1, max: 1000 }),
        },
        ecc: animalFound.ecc,
        milkProduction: animalFound.milkProduction,
        weight: animalFound.weight,
      },
      { status: HttpStatusCode.ok }
    )
  },
})
