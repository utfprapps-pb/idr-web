import axios, { AxiosResponse } from 'axios'

import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  type FilterValue,
} from '@/core/data/protocols/http'
import { env } from '@/core/env'

import { authInterceptorRequest } from './interceptors/auth-interceptor'

export const ITEMS_PER_PAGE = 10

export const baseApi = axios.create({
  baseURL: env.VITE_API_MOCKED ? '/api' : env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30 * 1000,
  validateStatus: (status: number) => status >= 200 && status < 300,
})
baseApi.interceptors.request.use(authInterceptorRequest)

export class ApiHttpClient<TModel = unknown, TApiModel = unknown>
  implements HttpClient<TModel, TApiModel>
{
  async request(
    data: HttpRequest<TModel, TApiModel>
  ): Promise<HttpResponse<TApiModel[]>> {
    let axiosResponse: AxiosResponse

    const { url, pagination, filters, sort, mapApiProperties } = data

    const filtersArray = filters
      ? Object.entries(filters)
          .filter(([, filter]) => {
            const { value } = filter as FilterValue
            return value !== undefined && value !== null && value !== ''
          })
          .reduce<Array<{ field: string; value: string; type: string }>>(
            (acc, [field, filter]) => {
              const { value, type } = filter as FilterValue
              if (mapApiProperties && field in mapApiProperties) {
                const mappedField = mapApiProperties[
                  field as keyof TModel
                ] as string
                acc.push({
                  field: mappedField,
                  value: String(value),
                  type,
                })
              }

              return acc
            },
            []
          )
      : undefined

    const sortInfo =
      sort && mapApiProperties && sort.field in mapApiProperties
        ? {
            sort: {
              field: mapApiProperties[sort.field as keyof TModel] as string,
              type: sort.direction.toUpperCase(),
            },
          }
        : {}

    try {
      axiosResponse = await baseApi.request({
        ...data,
        url,
        data: {
          ...(typeof data.body === 'object' && data.body !== null
            ? data.body
            : {}),
          ...(pagination
            ? {
                page: pagination.page - 1,
                rows: pagination.perPage ?? ITEMS_PER_PAGE,
              }
            : {}),
          ...sortInfo,
          ...(filtersArray && filtersArray.length > 0
            ? { filters: filtersArray }
            : {}),
        },
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      axiosResponse = error.response
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    }
  }
}
