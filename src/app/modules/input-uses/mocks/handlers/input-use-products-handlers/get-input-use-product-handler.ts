import { faker } from '@faker-js/faker/locale/pt_BR'
import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import inputUseProductsData from '@database/inputUseProductsData.json'

import type { InputUseProductDetailsApiResponse } from '@/app/modules/input-uses/domain/models/input-use-products-model'

export const getInputUseProductHandler = httpWithMiddleware<
  PathParams<'id'>,
  never,
  InputUseProductDetailsApiResponse
>({
  routePath: '/api/input-uses/products/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    const { id } = params

    const inputUseProduct = inputUseProductsData.find(
      (item) => item.id === Number(id)
    )

    if (!inputUseProduct) {
      return HttpResponse.json(null, { status: HttpStatusCode.notFound })
    }

    return HttpResponse.json(
      {
        name: inputUseProduct.name,
        category: {
          label: faker.commerce.department(),
          value: faker.number.int({ min: 1, max: 100 }),
        },
        activeIngredient: {
          label: faker.science.chemicalElement().name,
          value: faker.number.int({ min: 1, max: 100 }),
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
