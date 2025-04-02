import { faker } from '@faker-js/faker/locale/pt_BR'
import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import animalHeiferCalfStagesData from '@database/animalHeiferCalfStagesData.json'

export const getAnimalHeiferCalfStageHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  never
>({
  routePath:
    '/api/properties/:propertyId/animals/:animalId/heifer-calf-stages/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!animalHeiferCalfStagesData.length) {
      return HttpResponse.json(
        {},
        {
          status: 404,
        }
      )
    }

    const animalHeiferCalfStageFound = animalHeiferCalfStagesData.find(
      (animal) => animal.id === String(params.id)
    )

    if (!animalHeiferCalfStageFound) {
      return HttpResponse.json(
        {},
        {
          status: 404,
        }
      )
    }

    return HttpResponse.json(
      {
        weighingDate: animalHeiferCalfStageFound.weighingDate,
        weighing: {
          last: faker.number.float({
            min: 0,
            max: 100,
            fractionDigits: 2,
          }),
          current: animalHeiferCalfStageFound.weight,
        },
        ecc: animalHeiferCalfStageFound.ecc,
        age: {
          years: faker.number.int({ min: 1, max: 6 }),
          months: faker.number.int({ min: 1, max: 12 }),
        },
        ageWeightEstimate: {
          last: faker.number.float({
            min: 0,
            max: 100,
            fractionDigits: 2,
          }),
          current: faker.number.float({
            min: 0,
            max: 100,
            fractionDigits: 2,
          }),
        },
        gmd: {
          min: faker.number.float({
            min: 0,
            max: 100,
            fractionDigits: 2,
          }),
          max: faker.number.float({
            min: 0,
            max: 100,
            fractionDigits: 2,
          }),
          real: faker.number.float({
            min: 0,
            max: 100,
            fractionDigits: 2,
          }),
          status: faker.helpers.arrayElement([
            'normal',
            'overweight',
            'underweight',
          ]),
        },
        amountOfMilk: {
          morning: faker.number.float({
            min: 0,
            max: 100,
            fractionDigits: 2,
          }),
          afternoon: faker.number.float({
            min: 0,
            max: 100,
            fractionDigits: 2,
          }),
        },
        weaningDate: {
          first: faker.date.future().toISOString(),
          second: faker.date.future().toISOString(),
        },
        removeLittleHouseDate: faker.date.future().toISOString(),
        amountOfEstimateConcentrate: {
          heifer: faker.number.float({
            min: 0,
            max: 100,
            fractionDigits: 2,
          }),
          calf: faker.number.float({
            min: 0,
            max: 100,
            fractionDigits: 2,
          }),
        },
        bulky: faker.number.float({
          min: 0,
          max: 100,
          fractionDigits: 2,
        }),
        dateToProvideSilage: faker.date.future().toISOString(),
        reproduction: {
          status: faker.helpers.arrayElement(['fit', 'unfit']),
          minWeight: faker.number.float({
            min: 0,
            max: 100,
            fractionDigits: 2,
          }),
          fromDate: faker.date.future().toISOString(),
          carriedOut: faker.date.past().toISOString(),
          artificialInseminationNumber: faker.number.int({
            min: 1,
            max: 10,
          }),
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
