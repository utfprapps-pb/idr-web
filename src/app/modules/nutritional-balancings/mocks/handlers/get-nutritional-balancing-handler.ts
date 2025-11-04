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
            nutrientName: 'IMS (Ingestão de Matéria Seca)',
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
            nutrientName: 'NDT (Nutrientes Digestíveis Totais)',
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
            nutrientName: 'PB (Proteína Bruta)',
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
            nutrientName: 'Ca (Cálcio)',
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
            nutrientName: 'P (Fósforo)',
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
      },
      { status: HttpStatusCode.ok }
    )
  },
})
