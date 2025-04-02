import { faker } from '@faker-js/faker/locale/pt_BR'
import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

export const getAnimalHeiferCalfStageAdditionalDataHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  never,
  never
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/heifer-calf-stages',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async () => {
    return HttpResponse.json(
      {
        weighing: {
          last: String(
            faker.number.float({
              min: 0,
              max: 100,
              fractionDigits: 2,
            })
          ),
          current: '0',
        },
        age: {
          years: String(faker.number.int({ min: 1, max: 6 })),
          months: String(faker.number.int({ min: 1, max: 12 })),
        },
        ageWeightEstimate: {
          last: String(
            faker.number.float({
              min: 0,
              max: 100,
              fractionDigits: 2,
            })
          ),
          current: String(
            faker.number.float({
              min: 0,
              max: 100,
              fractionDigits: 2,
            })
          ),
        },
        gmd: {
          min: String(
            faker.number.float({
              min: 0,
              max: 100,
              fractionDigits: 2,
            })
          ),
          max: String(
            faker.number.float({
              min: 0,
              max: 100,
              fractionDigits: 2,
            })
          ),
          real: String(
            faker.number.float({
              min: 0,
              max: 100,
              fractionDigits: 2,
            })
          ),
          status: faker.helpers.arrayElement([
            'normal',
            'overweight',
            'underweight',
          ]),
        },
        amountOfMilk: (() => {
          const correction = faker.number.float({
            min: 0,
            max: 100,
            fractionDigits: 2,
          })

          return {
            correction: String(correction),
            morning: (correction / 2).toFixed(2),
            afternoon: (correction / 2).toFixed(2),
          }
        })(),
        weaningDate: {
          first: faker.date.future().toISOString(),
          second: faker.date.future().toISOString(),
        },
        removeLittleHouseDate: faker.date.future().toISOString(),
        amountOfEstimateConcentrate: {
          correction: String(
            faker.number.float({
              min: 0,
              max: 100,
              fractionDigits: 2,
            })
          ),
          heifer: String(
            faker.number.float({
              min: 0,
              max: 100,
              fractionDigits: 2,
            })
          ),
          calf: String(
            faker.number.float({
              min: 0,
              max: 100,
              fractionDigits: 2,
            })
          ),
        },
        bulky: String(
          faker.number.float({
            min: 0,
            max: 100,
            fractionDigits: 2,
          })
        ),
        dateToProvideSilage: faker.date.future().toISOString(),
        reproduction: {
          status: faker.helpers.arrayElement(['fit', 'unfit']),
          minWeight: String(
            faker.number.float({
              min: 0,
              max: 100,
              fractionDigits: 2,
            })
          ),
          fromDate: faker.date.future().toISOString(),
          carriedOut: faker.date.past().toISOString(),
          artificialInseminationNumber: String(
            faker.number.int({
              min: 1,
              max: 10,
            })
          ),
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
