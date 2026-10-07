import { faker } from '@faker-js/faker'
import { HttpResponse } from 'msw'

import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

type Response = {
  displayName: string
  role: string
}

export const getMeHandler = httpWithMiddleware<never, never, Response>({
  routePath: '/api/v1/users/me',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async () =>
    HttpResponse.json(
      {
        displayName: faker.person.fullName(),
        role: 'ADMIN',
      },
      { status: 200 }
    ),
})
