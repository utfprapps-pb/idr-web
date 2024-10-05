import { HttpResponse, PathParams } from 'msw'

import { httpWithMiddleware } from '@/mocks/lib'
import { withAuth, withDelay } from '@/mocks/middleware'

export const deletePropertyService = httpWithMiddleware<
	PathParams<'id'>,
	never,
	never
>({
	routePath: '/api/properties/:id',
	method: 'delete',
	middlewares: [withDelay(), withAuth],
	resolver: async () =>
		HttpResponse.json(undefined, {
			status: 204
		})
})
