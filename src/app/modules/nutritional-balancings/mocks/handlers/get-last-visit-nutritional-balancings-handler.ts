import { faker } from '@faker-js/faker/locale/pt_BR'
import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import nutritionalBalancingsData from '@database/nutritionalBalancingsData.json'

import type { NutritionalBalancingDetailsApiResponse } from '../../domain/models/nutritional-balancings-model'

type LastVisitApiResponse = {
  visitId: number
  nutritionalBalancings: Array<NutritionalBalancingDetailsApiResponse>
}

export const getLastVisitNutritionalBalancingsHandler = httpWithMiddleware<
  PathParams<'propertyId'>,
  never,
  LastVisitApiResponse
>({
  routePath: '/api/properties/:propertyId/nutritional-balancings/last-visit',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async () => {
    if (!nutritionalBalancingsData.length) {
      return HttpResponse.json({} as LastVisitApiResponse, {
        status: 404,
      })
    }

    const lastVisitId = Math.max(
      ...nutritionalBalancingsData.map((nutritional) => nutritional.visitId)
    )

    const lastVisitBalancings = nutritionalBalancingsData.filter(
      (nutritional) => nutritional.visitId === lastVisitId
    )

    if (!lastVisitBalancings.length) {
      return HttpResponse.json({} as LastVisitApiResponse, {
        status: 404,
      })
    }

    return HttpResponse.json(
      {
        visitId: lastVisitId,
        nutritionalBalancings: lastVisitBalancings.map((nutritional) => ({
          date: nutritional.date,
          visitId: nutritional.visitId,
          animal: {
            id: nutritional.id,
            name: nutritional.animal,
            breed: nutritional.breed,
            weight: String(nutritional.weight),
            milkProduction: String(nutritional.milkProduction),
            ecc: faker.number
              .float({ min: 1, max: 10, fractionDigits: 2 })
              .toString(),
            estimatedMilkProduction: String(
              nutritional.estimatedMilkProduction
            ),
          },
          summary: {
            concentrateDryMatterPercent: faker.number
              .float({
                min: 1,
                max: 100,
                fractionDigits: 2,
              })
              .toString(),
            etherExtractPercent: faker.number
              .float({
                min: 1,
                max: 100,
                fractionDigits: 2,
              })
              .toString(),
            forageDryMatterPercent: faker.number
              .float({
                min: 1,
                max: 100,
                fractionDigits: 2,
              })
              .toString(),
            nonFibrousCarbohydratesPercent: faker.number
              .float({
                min: 1,
                max: 100,
                fractionDigits: 2,
              })
              .toString(),
            totalDryMatter: faker.number
              .float({
                min: 1,
                max: 100,
                fractionDigits: 2,
              })
              .toString(),
            rdpTdnRatio: faker.number
              .float({
                min: 0,
                max: 1,
                fractionDigits: 3,
              })
              .toString(),
          },
          evaluations: [
            {
              nutrientName: 'IMS',
              evaluationStatus: faker.helpers.arrayElement([
                'ABOVE',
                'BELOW',
                'NORMAL',
              ]),
              providedValue: faker.number
                .float({
                  min: 1,
                  max: 10,
                  fractionDigits: 2,
                })
                .toString(),
              requiredValue: faker.number
                .float({
                  min: 1,
                  max: 10,
                  fractionDigits: 2,
                })
                .toString(),
            },
            {
              nutrientName: 'NDT',
              evaluationStatus: faker.helpers.arrayElement([
                'ABOVE',
                'BELOW',
                'NORMAL',
              ]),
              providedValue: faker.number
                .float({
                  min: 1,
                  max: 10,
                  fractionDigits: 2,
                })
                .toString(),
              requiredValue: faker.number
                .float({
                  min: 1,
                  max: 10,
                  fractionDigits: 2,
                })
                .toString(),
            },
            {
              nutrientName: 'PB',
              evaluationStatus: faker.helpers.arrayElement([
                'ABOVE',
                'BELOW',
                'NORMAL',
              ]),
              providedValue: faker.number
                .float({
                  min: 1,
                  max: 10,
                  fractionDigits: 2,
                })
                .toString(),
              requiredValue: faker.number
                .float({
                  min: 1,
                  max: 10,
                  fractionDigits: 2,
                })
                .toString(),
            },
            {
              nutrientName: 'Ca',
              evaluationStatus: faker.helpers.arrayElement([
                'ABOVE',
                'BELOW',
                'NORMAL',
              ]),
              providedValue: faker.number
                .float({
                  min: 1,
                  max: 10,
                  fractionDigits: 2,
                })
                .toString(),
              requiredValue: faker.number
                .float({
                  min: 1,
                  max: 10,
                  fractionDigits: 2,
                })
                .toString(),
            },
            {
              nutrientName: 'P',
              evaluationStatus: faker.helpers.arrayElement([
                'ABOVE',
                'BELOW',
                'NORMAL',
              ]),
              providedValue: faker.number
                .float({
                  min: 1,
                  max: 10,
                  fractionDigits: 2,
                })
                .toString(),
              requiredValue: faker.number
                .float({
                  min: 1,
                  max: 10,
                  fractionDigits: 2,
                })
                .toString(),
            },
          ],
          ingredientGroups: [
            {
              category: 'FORAGE',
              ingredients: Array.from({ length: 3 }).map(() => ({
                ingredient: {
                  value: faker.number.int({ min: 1, max: 10000 }),
                  label: faker.commerce.productName(),
                },
                quantity: faker.number
                  .float({
                    min: 1,
                    max: 100,
                    fractionDigits: 2,
                  })
                  .toString(),
              })),
            },
            {
              category: 'CONCENTRATE',
              ingredients: Array.from({ length: 3 }).map(() => ({
                ingredient: {
                  value: faker.number.int({ min: 1, max: 10000 }),
                  label: faker.commerce.productName(),
                },
                quantity: faker.number
                  .float({
                    min: 1,
                    max: 100,
                    fractionDigits: 2,
                  })
                  .toString(),
              })),
            },
            {
              category: 'MINERAL',
              ingredients: Array.from({ length: 3 }).map(() => ({
                ingredient: {
                  value: faker.number.int({ min: 1, max: 10000 }),
                  label: faker.commerce.productName(),
                },
                quantity: faker.number
                  .float({
                    min: 1,
                    max: 100,
                    fractionDigits: 2,
                  })
                  .toString(),
              })),
            },
          ],
        })),
      },
      { status: HttpStatusCode.ok }
    )
  },
})
