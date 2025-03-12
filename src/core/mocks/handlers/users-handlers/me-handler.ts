import { faker } from '@faker-js/faker'
import { HttpResponse } from 'msw'

import { httpWithMiddleware } from '../../lib'
import { withDelay, withAuth } from '../../middleware'

type Response = {
  name: string
}

export const meHandler = httpWithMiddleware<never, never, Response | object>({
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
