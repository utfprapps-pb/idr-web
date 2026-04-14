import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'
import { filterData, paginateData, sortData } from '@/core/mocks/utils'

import inputUseProductCategoriesData from '@database/inputUseProductCategoriesData.json'
import inputUseProductsData from '@database/inputUseProductsData.json'

import type { InputUseProductApiResponse } from '@/app/modules/input-uses/domain/models/input-use-products-model'
import type { MockParams } from '@/core/mocks/types/mock-params-type'
import type { MockResponse } from '@/core/mocks/types/mock-response-type'

export const getInputUseProductsHandler = httpWithMiddleware<
  PathParams,
  MockParams<InputUseProductApiResponse>,
  MockResponse<InputUseProductApiResponse[]>
>({
  routePath: '/api/input-uses/products/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, page, rows, sort } = await request.json()

    if (!inputUseProductsData.length) {
      return HttpResponse.json(
        {
          content: [],
          numberOfElements: 0,
          pageable: {
            pageSize: 0,
          },
        },
        {
          status: 404,
        }
      )
    }

    let inputUseProducts = inputUseProductsData.map((product) => {
      const category = inputUseProductCategoriesData.find(
        (cat) => cat.id === product.productCategoryId
      )
      return {
        id: product.id,
        name: product.name,
        category: category?.name ?? 'Não informada',
      }
    })

    if (filters) {
      inputUseProducts = filterData<InputUseProductApiResponse>(
        filters,
        inputUseProducts
      )
    }
    if (sort) {
      inputUseProducts = sortData<InputUseProductApiResponse>(
        sort,
        inputUseProducts
      )
    }

    const numberOfElements = inputUseProducts.length
    inputUseProducts = paginateData<InputUseProductApiResponse>(
      { page, perPage: rows },
      inputUseProducts
    )

    return HttpResponse.json(
      {
        content: inputUseProducts,
        numberOfElements,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
