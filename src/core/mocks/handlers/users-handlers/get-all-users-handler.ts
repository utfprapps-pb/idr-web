import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'

import allUsersData from '@database/allUsersData.json'

import { httpWithMiddleware } from '../../lib'
import { withDelay, withAuth } from '../../middleware'
import { filterData } from '../../utils'

import type { MockParams } from '../../types/mock-params-type'
import type { MockResponse } from '../../types/mock-response-type'
import type { UserApiResponse } from '@/app/modules/users/domain/models/users-model'

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
