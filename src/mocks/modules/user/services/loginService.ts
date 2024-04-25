import { faker } from '@faker-js/faker'
import { HttpResponse } from 'msw'

import { httpWithMiddleware } from '@/mocks/lib'
import { withDelay } from '@/mocks/middleware'

type Params = {
	username: string
	password: string
}

type Response = {
	user: {
		displayName: string
	}
	token: string
}

export const loginService = httpWithMiddleware<never, Params, Response | {}>({
	routePath: '/api/login',
	method: 'post',
	middlewares: [withDelay()],
	resolver: async ({ request }) => {
		const { username, password } = await request.json()

		if (
			username === 'mockedUser@gmail.com' &&
			password === 'mockedUserPassword'
		) {
			return HttpResponse.json({
				token: faker.string.uuid(),
				user: {
					displayName: faker.person.fullName()
				}
			})
		}

		return HttpResponse.json({}, { status: 401 })
	}
})
