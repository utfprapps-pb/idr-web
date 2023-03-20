import axios, { AxiosResponse } from 'axios'

import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http'
import { env } from '@/main/env'

export const baseAxios = axios.create({
	baseURL: env.VITE_API_BASE_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	timeout: 30 * 1000,
	validateStatus: (status: number) => status >= 200 && status < 300
})

export class AxiosHttpClient<T = unknown> implements HttpClient<T> {
	async request(data: HttpRequest): Promise<HttpResponse<T>> {
		let axiosResponse: AxiosResponse

		const { url: rawUrl, pagination, filters } = data

		try {
			const url = this.makeUrlWithFiltersAndPagination({
				url: rawUrl,
				filters,
				pagination
			})

			axiosResponse = await baseAxios.request({
				...data,
				url,
				data: data.body
			})
		} catch (error: any) {
			axiosResponse = error.response
		}

		return {
			statusCode: axiosResponse.status,
			body: axiosResponse.data
		}
	}

	private makeUrlWithFiltersAndPagination(params: {
		url: string
		filters: HttpRequest['filters']
		pagination: HttpRequest['pagination']
	}) {
		const {
			url,
			filters = {},
			pagination = {
				page: 1,
				perPage: 10
			}
		} = params

		const paginationKeys = Object.keys(pagination)
		const filtersKeys = Object.keys(filters)

		if (!filtersKeys.length && !paginationKeys.length) return url

		if (!paginationKeys.includes('perPage')) pagination.perPage = 10

		const esc = encodeURIComponent
		const filtersAndPagination = [
			...Object.entries(pagination).map(
				([key, value]) => `${esc(key)}=${esc(value)}`
			),
			...Object.entries(filters).map(
				([key, value]) => `${esc(key)}=${esc(value)}`
			)
		]

		const query = filtersAndPagination.join('&')
		return `${url}?${query}`
	}
}
