import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import inputUseProductCategoriesData from '@database/inputUseProductCategoriesData.json'
import inputUseProductsData from '@database/inputUseProductsData.json'

import type { InputUseProductDetailsApiResponse } from '@/app/modules/input-uses/domain/models/input-use-products-model'

export const getInputUseProductHandler = httpWithMiddleware<
  { id: string },
  undefined,
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

    const category = inputUseProductCategoriesData.find(
      (cat) => cat.id === inputUseProduct.productCategoryId
    )

    return HttpResponse.json(
      {
        name: inputUseProduct.name,
        category: category
          ? { value: category.id, label: category.name }
          : { value: 0, label: '' },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
