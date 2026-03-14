import { faker } from '@faker-js/faker/locale/pt_BR'
import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import nutritionalBalancingsData from '@database/nutritionalBalancingsData.json'

import type { NutritionalBalancingDetailsApiResponse } from '../../domain/models/nutritional-balancings-model'

export const getNutritionalBalancingHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'id'>,
  never,
  NutritionalBalancingDetailsApiResponse
>({
  routePath: '/api/properties/:propertyId/nutritional-balancings/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!nutritionalBalancingsData.length) {
      return HttpResponse.json({} as NutritionalBalancingDetailsApiResponse, {
        status: 404,
      })
    }

    const nutritionalBalancingFound = nutritionalBalancingsData.find(
      (nutritionalBalancing) => nutritionalBalancing.id === Number(params.id)
    )

    if (!nutritionalBalancingFound) {
      return HttpResponse.json({} as NutritionalBalancingDetailsApiResponse, {
        status: 404,
      })
    }

    return HttpResponse.json(
      {
        date: nutritionalBalancingFound.date,
        visitId: nutritionalBalancingFound.visitId,
        animal: {
          id: nutritionalBalancingFound.id,
          name: nutritionalBalancingFound.animal,
          breed: nutritionalBalancingFound.breed,
          weight: String(nutritionalBalancingFound.weight),
          milkProduction: String(nutritionalBalancingFound.milkProduction),
          ecc: faker.number
            .float({ min: 1, max: 10, fractionDigits: 2 })
            .toString(),
          estimatedMilkProduction: String(
            nutritionalBalancingFound.estimatedMilkProduction
          ),
        },
        evaluations: [
          {
            nutrientName: 'IMS (Ingestão de Matéria Seca)',
            requiredValue: faker.number
              .float({ min: 10, max: 25, fractionDigits: 2 })
              .toString(),
          },
          {
            nutrientName: 'NDT (Nutrientes Digestíveis Totais)',
            requiredValue: faker.number
              .float({ min: 5, max: 15, fractionDigits: 2 })
              .toString(),
          },
          {
            nutrientName: 'PB (Proteína Bruta)',
            requiredValue: faker.number
              .float({ min: 1, max: 5, fractionDigits: 2 })
              .toString(),
          },
          {
            nutrientName: 'Ca (Cálcio)',
            requiredValue: faker.number
              .float({ min: 0.05, max: 0.2, fractionDigits: 2 })
              .toString(),
          },
          {
            nutrientName: 'P (Fósforo)',
            requiredValue: faker.number
              .float({ min: 0.02, max: 0.1, fractionDigits: 2 })
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
                extraData: {
                  type: 'FORAGE',
                  crudeProtein: faker.number.float({
                    min: 5,
                    max: 20,
                    fractionDigits: 2,
                  }),
                  totalDigestibleNutrients: faker.number.float({
                    min: 50,
                    max: 70,
                    fractionDigits: 2,
                  }),
                  dryMatter: faker.number.float({
                    min: 20,
                    max: 90,
                    fractionDigits: 2,
                  }),
                  calcium: faker.number.float({
                    min: 0.1,
                    max: 1,
                    fractionDigits: 2,
                  }),
                  phosphorus: faker.number.float({
                    min: 0.1,
                    max: 0.5,
                    fractionDigits: 2,
                  }),
                  nonFibrousCarbohydrates: faker.number.float({
                    min: 10,
                    max: 30,
                    fractionDigits: 2,
                  }),
                  etherExtract: faker.number.float({
                    min: 1,
                    max: 4,
                    fractionDigits: 2,
                  }),
                  rumenDegradableProtein: faker.number.float({
                    min: 5,
                    max: 15,
                    fractionDigits: 2,
                  }),
                },
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
                extraData: {
                  type: 'CONCENTRATE',
                  crudeProtein: faker.number.float({
                    min: 15,
                    max: 40,
                    fractionDigits: 2,
                  }),
                  totalDigestibleNutrients: faker.number.float({
                    min: 70,
                    max: 85,
                    fractionDigits: 2,
                  }),
                  dryMatter: faker.number.float({
                    min: 85,
                    max: 95,
                    fractionDigits: 2,
                  }),
                  calcium: faker.number.float({
                    min: 0.1,
                    max: 0.5,
                    fractionDigits: 2,
                  }),
                  phosphorus: faker.number.float({
                    min: 0.3,
                    max: 0.8,
                    fractionDigits: 2,
                  }),
                  nonFibrousCarbohydrates: faker.number.float({
                    min: 30,
                    max: 60,
                    fractionDigits: 2,
                  }),
                  etherExtract: faker.number.float({
                    min: 2,
                    max: 6,
                    fractionDigits: 2,
                  }),
                  rumenDegradableProtein: faker.number.float({
                    min: 10,
                    max: 25,
                    fractionDigits: 2,
                  }),
                },
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
                extraData: {
                  type: 'MINERAL',
                  crudeProtein: 0,
                  totalDigestibleNutrients: 0,
                  dryMatter: 95,
                  calcium: faker.number.float({
                    min: 10,
                    max: 30,
                    fractionDigits: 2,
                  }),
                  phosphorus: faker.number.float({
                    min: 5,
                    max: 15,
                    fractionDigits: 2,
                  }),
                  nonFibrousCarbohydrates: 0,
                  etherExtract: 0,
                  rumenDegradableProtein: 0,
                },
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
      },
      { status: HttpStatusCode.ok }
    )
  },
})
