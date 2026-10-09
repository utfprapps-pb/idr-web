import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import animalsData from '@database/animalsData.json'

/** Formato real do `GetAnimalByIdOutput`: `breedId` plano, sem objeto `breed` aninhado. */
type AnimalGetApiResponse = {
  id: string
  identifier: string
  breedId: number
  currentWeight: number | null
  ecc: number | null
}

export const getAnimalHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'id'>,
  never,
  AnimalGetApiResponse
>({
  routePath: '/api/properties/:propertyId/animals/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!animalsData.length) {
      return HttpResponse.json({} as AnimalGetApiResponse, {
        status: 404,
      })
    }

    const animalFound = animalsData.find((animal) => animal.id === params.id)

    if (!animalFound) {
      return HttpResponse.json({} as AnimalGetApiResponse, {
        status: 404,
      })
    }

    return HttpResponse.json(
      {
        id: animalFound.id,
        identifier: animalFound.identifier,
        breedId: animalFound.breed.id,
        currentWeight: animalFound.currentWeight,
        ecc: animalFound.ecc,
      },
      { status: HttpStatusCode.ok }
    )
  },
})
