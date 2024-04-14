import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/data/protocols/http'
import { PropertyDetailsModel } from '@/domain/models'
import { httpWithMiddleware } from '@/mocks/lib'
import { withAuth, withDelay } from '@/mocks/middleware'

export const createPropertyService = httpWithMiddleware<
	never,
	PropertyDetailsModel,
	never
>({
	routePath: '/api/properties',
	method: 'post',
	middlewares: [withDelay(), withAuth],
	resolver: async () =>
		HttpResponse.json({}, { status: HttpStatusCode.created })
})
