export type HttpMethodBrasilApi = 'get'

export enum HttpStatusCodeBrasilApi {
	ok = 200,
	notFound = 404
}

export type HttpRequestBrasilApi = {
	url: string
	method: HttpMethodBrasilApi
}

export type HttpResponseBrasilApi<T = unknown> = {
	statusCode: HttpStatusCodeBrasilApi
	body?: T
}

export interface HttpClientBrasilApi<T = unknown> {
	request: (data: HttpRequestBrasilApi) => Promise<HttpResponseBrasilApi<T>>
}
