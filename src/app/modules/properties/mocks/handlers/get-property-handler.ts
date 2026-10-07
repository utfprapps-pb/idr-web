import { faker } from '@faker-js/faker/locale/pt_BR'
import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import propertiesData from '@database/propertiesData.json'

import type { PropertyDetailsApiResponse } from '../../domain/models/properties-model'

export const getPropertyHandler = httpWithMiddleware<
  PathParams<'id'>,
  never,
  PropertyDetailsApiResponse
>({
  routePath: '/api/v1/properties/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    const propertyFound = propertiesData.find(
      (property) => String(property.id) === params.id
    )

    if (!propertyFound) {
      return HttpResponse.json({} as PropertyDetailsApiResponse, {
        status: HttpStatusCode.notFound,
      })
    }

    const response: PropertyDetailsApiResponse = {
      id: String(propertyFound.id),
      name: propertyFound.name,
      nakedAveragePrice: faker.number.float({
        min: 1,
        max: 10000,
        fractionDigits: 2,
      }),
      leaseAveragePrice: faker.number.float({
        min: 1,
        max: 5000,
        fractionDigits: 2,
      }),
      dairyCattleFarmingArea: faker.number.float({
        min: 1,
        max: 50,
        fractionDigits: 2,
      }),
      perennialPastureArea: faker.number.float({
        min: 1,
        max: 50,
        fractionDigits: 2,
      }),
      summerPlowingArea: faker.number.float({
        min: 1,
        max: 50,
        fractionDigits: 2,
      }),
      winterPlowingArea: faker.number.float({
        min: 1,
        max: 50,
        fractionDigits: 2,
      }),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      producer: {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
      },
      city: {
        id: 'ad907cbd-704c-4da2-b998-d56e142302f5',
        name: faker.location.city(),
      },
      technicians: Array.from({ length: 2 }, () => ({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
      })),
      collaborators: Array.from({ length: 3 }, () => ({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        hoursPerDay: String(faker.number.int({ min: 1, max: 8 })),
      })),
      attachments: [],
    }

    return HttpResponse.json(response, { status: HttpStatusCode.ok })
  },
})
