import { faker } from '@faker-js/faker'
import { HttpResponse } from 'msw'

import { httpWithMiddleware } from '@/mocks/lib'
import { withAuth, withDelay } from '@/mocks/middleware'

type Response = {
  name: string
}

export const meService = httpWithMiddleware<never, never, Response | object>({
  routePath: '/api/users/me',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json(
      {
        name: faker.person.fullName(),
      },
      { status: 200 }
    ),
})
