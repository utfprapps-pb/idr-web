import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { filterData } from '@/core/mocks/utils'

import allUsersData from '@database/allUsersData.json'

import type { UserApiResponse } from '../../domain/models/users-model'
import type { MockParams } from '@/core/mocks/types/mock-params-type'
import type { MockResponse } from '@/core/mocks/types/mock-response-type'

export const getAllUsersHandler = httpWithMiddleware<
  never,
  MockParams<UserApiResponse>,
  MockResponse<UserApiResponse[]>
>({
  routePath: '/api/users/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, rows } = await request.json()

    if (!allUsersData.length) {
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

    if (filters) {
      const users = filterData<UserApiResponse>(filters, allUsersData)
      return HttpResponse.json(
        {
          content: users,
          numberOfElements: users.length,
          pageable: {
            pageSize: rows,
          },
        },
        { status: HttpStatusCode.ok }
      )
    }

    return HttpResponse.json(
      {
        content: allUsersData,
        numberOfElements: allUsersData.length,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
