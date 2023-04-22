import axios, { AxiosResponse } from 'axios'

import {
	HttpClientBrasilApi,
	HttpRequestBrasilApi,
	HttpResponseBrasilApi
} from '@/data/protocols/http'

export const brasilApi = axios.create({
	baseURL: 'https://brasilapi.com.br/',
	headers: {
		'Content-Type': 'application/json'
	},
	timeout: 30 * 1000,
	validateStatus: (status: number) => status >= 200 && status < 300
})

export class BrasilApiHttpClient<T = unknown>
	implements HttpClientBrasilApi<T>
{
	async request(data: HttpRequestBrasilApi): Promise<HttpResponseBrasilApi<T>> {
		let axiosResponse: AxiosResponse

		try {
			axiosResponse = await brasilApi.request({
				...data
			})
		} catch (error: any) {
			axiosResponse = error.response
		}

		return {
			statusCode: axiosResponse.status,
			body: axiosResponse.data
		}
	}
}
