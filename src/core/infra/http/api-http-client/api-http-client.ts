import axios, { AxiosResponse } from 'axios'

import {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '@/core/data/protocols/http'
import { env } from '@/core/env'

import { authInterceptorRequest } from './interceptors/auth-interceptor'

import type { ApiSort, FilterValue } from '@/core/domain/types'

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

export class ApiHttpClient<
  TModel = unknown,
  TApiModel = unknown,
  TApiResponse = unknown,
> implements HttpClient<TModel, TApiModel, TApiResponse>
{
  async request(
    data: HttpRequest<TModel, TApiModel>
  ): Promise<HttpResponse<TApiResponse>> {
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

    const sortInfo: ApiSort<TApiModel> | undefined =
      sort && mapApiProperties && sort.field in mapApiProperties
        ? {
            type: sort.direction,
            field: mapApiProperties[sort.field] as keyof TApiModel,
          }
        : undefined

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
          ...(sortInfo ? { sort: sortInfo } : {}),
          ...(filtersArray && filtersArray.length > 0
            ? { filters: filtersArray }
            : {}),
        },
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Request error:', error.message)
      }

      if (!axios.isAxiosError(error) || !error.response) {
        throw error
      }

      axiosResponse = error.response
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    }
  }
}
