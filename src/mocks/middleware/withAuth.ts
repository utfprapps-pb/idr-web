import {
	DefaultBodyType,
	HttpResponse,
	PathParams,
	type HttpResponseResolver,
} from 'msw'
import { type AsyncResponseResolverReturnType } from 'msw/lib/core/handlers/RequestHandler'

export function withAuth<
	Params extends PathParams,
	RequestBodyType extends DefaultBodyType,
	ResponseBodyType extends DefaultBodyType,
>(
	resolver: HttpResponseResolver<Params, RequestBodyType, ResponseBodyType>
): HttpResponseResolver<Params, RequestBodyType, ResponseBodyType> {
	return (context) => {
		const { request } = context

		if (!request.headers.get('Authorization')) {
			return new HttpResponse(null, {
				status: 401,
			}) as AsyncResponseResolverReturnType<ResponseBodyType>
		}

		return resolver(context)
	}
}
