import { faker } from '@faker-js/faker/locale/pt_BR'
import { HttpResponse, type PathParams } from 'msw'

import {
  type ForageAvailabilityApiResponse,
  type ForageAvailabilityDetailsApiResponse,
} from '@/app/modules/forage-availability/domain/models/forage-availability-model'
import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import forageAvailabilitiesData from '@database/forageAvailabilitiesData.json'

export const getForageAvailabilityHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'id'>,
  never,
  ForageAvailabilityDetailsApiResponse
>({
  routePath: '/api/properties/:propertyId/forage-availabilities/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    const id = Number(params.id)
    const forageAvailability = forageAvailabilitiesData.find(
      (item: ForageAvailabilityApiResponse) => item.id === id
    )

    if (!forageAvailability) {
      return HttpResponse.json({} as ForageAvailabilityDetailsApiResponse, {
        status: HttpStatusCode.notFound,
      })
    }

    const response: ForageAvailabilityDetailsApiResponse = {
      ...forageAvailability,
      date: forageAvailability.date.toString(),
      forage: {
        label: forageAvailability.forage,
        value: faker.number.int({ min: 1, max: 1000 }),
      },
    }

    return HttpResponse.json(response, { status: HttpStatusCode.ok })
  },
})
