import { faker } from '@faker-js/faker/locale/pt_BR'
import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import animalInseminationsData from '@database/animalInseminationsData.json'

import type { AnimalInseminationDetailsApiResponse } from '../../../domain/models/animal-inseminations-model'

export const getAnimalInseminationHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  AnimalInseminationDetailsApiResponse
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/inseminations/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!animalInseminationsData.length) {
      return HttpResponse.json({} as AnimalInseminationDetailsApiResponse, {
        status: 404,
      })
    }

    const animalInseminationFound = animalInseminationsData.find(
      (animal) => animal.id === Number(params.id)
    )

    if (!animalInseminationFound) {
      return HttpResponse.json({} as AnimalInseminationDetailsApiResponse, {
        status: 404,
      })
    }

    return HttpResponse.json(
      {
        date: animalInseminationFound.date,
        sire: {
          value: faker.number.int({ min: 1, max: 1000 }),
          label: animalInseminationFound.sire,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
