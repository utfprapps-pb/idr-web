import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import allUsersData from '@database/allUsersData.json'

export const searchUsersHandler = httpWithMiddleware<never, never, never>({
  routePath: '/api/v1/users/search',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const url = new URL(request.url)
    const terms = url.searchParams.get('terms') ?? ''
    const page = Number(url.searchParams.get('page') ?? 0)
    const perPage = Number(url.searchParams.get('perPage') ?? 10)

    const filtered = terms
      ? allUsersData.filter((user) =>
          user.displayName.toLowerCase().includes(terms.toLowerCase())
        )
      : allUsersData

    const start = page * perPage
    const items = filtered.slice(start, start + perPage).map((user) => ({
      id: String(user.id),
      name: user.displayName,
    }))

    return HttpResponse.json(
      {
        currentPage: page,
        perPage,
        total: filtered.length,
        items,
      },
      { status: HttpStatusCode.ok }
    )
  },
})
