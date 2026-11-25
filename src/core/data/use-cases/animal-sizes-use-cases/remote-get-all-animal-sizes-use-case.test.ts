import { describe, expect, it } from 'vitest'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { HttpClientSpy } from '@/core/data/test/http-client-spy'
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'

import { RemoteGetAllAnimalSizesUseCase } from './remote-get-all-animal-sizes-use-case'

import type { HttpResponse } from '@/core/data/protocols/http'
import type {
  AnimalSizeApiResponse,
  AnimalSizeModel,
} from '@/core/domain/models/animal-sizes-model'
import type { SearchApiResponse } from '@/core/domain/types'

type SearchResponse = SearchApiResponse<AnimalSizeApiResponse>

const GRANDE_ID = 'a5000000-0000-0000-0000-000000000003'

function makeSut(response: HttpResponse<SearchResponse>) {
  const httpClientSpy = new HttpClientSpy<
    AnimalSizeModel,
    AnimalSizeApiResponse,
    SearchResponse
  >()
  httpClientSpy.response = response

  const sut = new RemoteGetAllAnimalSizesUseCase('animal-sizes', httpClientSpy)

  return { sut, httpClientSpy }
}

describe('RemoteGetAllAnimalSizesUseCase', () => {
  it('busca em GET /animal-sizes/search com a página da API', async () => {
    const { sut, httpClientSpy } = makeSut({
      statusCode: HttpStatusCode.ok,
      body: { currentPage: 0, perPage: 30, total: 0, items: [] },
    })

    await sut.execute({ pagination: { page: 1, perPage: 30 } })

    const { url, method } = httpClientSpy.lastRequest!
    const [path, query] = url.split('?')
    const params = new URLSearchParams(query)

    expect(method).toBe('get')
    expect(path).toBe('animal-sizes/search')
    expect(params.get('page')).toBe('0')
    expect(params.get('perPage')).toBe('30')
  })

  it('traduz sizeName da API para name', async () => {
    const { sut } = makeSut({
      statusCode: HttpStatusCode.ok,
      body: {
        currentPage: 0,
        perPage: 30,
        total: 1,
        items: [{ id: GRANDE_ID, sizeName: 'Grande' }],
      },
    })

    const response = await sut.execute({ pagination: { page: 1 } })

    expect(response.resources).toEqual([{ id: GRANDE_ID, name: 'Grande' }])
  })

  it.each([
    [HttpStatusCode.badRequest, BadRequestError],
    [HttpStatusCode.notFound, NotFoundError],
    [HttpStatusCode.forbidden, ForbiddenError],
    [HttpStatusCode.serverError, UnexpectedError],
  ])('responde %s com %o', async (statusCode, error) => {
    const { sut } = makeSut({ statusCode })

    await expect(
      sut.execute({ pagination: { page: 1 } })
    ).rejects.toBeInstanceOf(error)
  })
})
