export type HttpMethod = 'get' | 'post' | 'delete' | 'patch'

export enum HttpStatusCode {
	ok = 200,
	created = 201,
	noContent = 204,

	badRequest = 400,
	unauthorized = 401,
	forbidden = 403,
	notFound = 404,

	serverError = 500
}

export type SortDirection = 'asc' | 'desc'

export type HttpRequest<F = Record<string, string>> = {
	url: string
	method: HttpMethod
	body?: unknown
	filters?: F
	pagination?: {
		page: number
		perPage?: number
	}
	sort?: {
		direction: SortDirection
		field: string
	}
}

export type HttpResponse<TBody = any> = {
	statusCode: HttpStatusCode
	body?: TBody
}

export interface IHttpClient<T = any, F = Record<string, string>> {
	request: (data: HttpRequest<F>) => Promise<HttpResponse<T>>
}
