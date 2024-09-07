import { faker } from '@faker-js/faker'
import { HttpResponse } from 'msw'

import { httpWithMiddleware } from '@/mocks/lib'
import { withAuth, withDelay } from '@/mocks/middleware'

type Response = {
	displayName: string
}

export const meService = httpWithMiddleware<never, never, Response | {}>({
	routePath: '/api/me',
	method: 'get',
	middlewares: [withDelay(), withAuth],
	resolver: async () =>
		HttpResponse.json(
			{
				displayName: faker.person.fullName()
			},
			{ status: 200 }
		)
})
