import { describe, expect, it } from 'vitest'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { HttpClientSpy } from '@/core/data/test/http-client-spy'
import {
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'

import { RemoteGetAnimalsUseCase } from './remote-get-animals-use-case'

import type {
  AnimalApiResponse,
  AnimalModel,
} from '../../domain/models/animals-model'
import type { HttpResponse } from '@/core/data/protocols/http'
import type { SearchApiResponse } from '@/core/domain/types'

type SearchResponse = SearchApiResponse<AnimalApiResponse>

const PROPERTY_ID = 'c0000000-0000-0000-0000-000000000001'

function animal(overrides: Partial<AnimalApiResponse> = {}): AnimalApiResponse {
  return {
    id: 'e0000000-0000-0000-0000-000000000001',
    propertyId: PROPERTY_ID,
    animalMotherId: null,
    breedId: 'breed-1',
    breedName: 'Jersey',
    type: null,
    identifier: 'Mimosa',
    gender: 'FEMALE',
    bornCondition: null,
    bornDate: '2022-03-01',
    bornWeight: 30,
    previousWeight: 400,
    currentWeight: 450.5,
    ecc: 3.25,
    ...overrides,
  }
}

function makeSut(response: HttpResponse<SearchResponse>) {
  const httpClientSpy = new HttpClientSpy<
    AnimalModel,
    AnimalApiResponse,
    SearchResponse
  >()
  httpClientSpy.response = response

  const sut = new RemoteGetAnimalsUseCase(
    '/properties/:propertyId/animals',
    httpClientSpy
  )

  return { sut, httpClientSpy }
}

describe('RemoteGetAnimalsUseCase', () => {
  it('busca em GET /search com a propriedade da rota e a página da API', async () => {
    const { sut, httpClientSpy } = makeSut({
      statusCode: HttpStatusCode.ok,
      body: { currentPage: 1, perPage: 10, total: 0, items: [] },
    })

    await sut.execute({
      propertyId: PROPERTY_ID,
      pagination: { page: 2, perPage: 10 },
      sort: { field: 'name', direction: 'asc' },
    })

    expect(httpClientSpy.requests).toHaveLength(1)

    const { url, method } = httpClientSpy.lastRequest!
    const [path, query] = url.split('?')
    const params = new URLSearchParams(query)

    expect(method).toBe('get')
    expect(path).toBe(`/properties/${PROPERTY_ID}/animals/search`)
    expect(params.get('page')).toBe('1')
    expect(params.get('perPage')).toBe('10')
    expect(params.get('sort')).toBe('identifier')
    expect(params.get('direction')).toBe('asc')
  })

  it('calcula totalPages pelo total, não pelos itens da página', async () => {
    const { sut } = makeSut({
      statusCode: HttpStatusCode.ok,
      body: {
        currentPage: 2,
        perPage: 10,
        total: 23,
        items: [animal(), animal(), animal()],
      },
    })

    const result = await sut.execute({
      propertyId: PROPERTY_ID,
      pagination: { page: 3, perPage: 10 },
    })

    expect(result.totalPages).toBe(3)
    expect(result.resources).toHaveLength(3)
  })

  it('mapeia o DTO da API para o modelo da tela', async () => {
    const { sut } = makeSut({
      statusCode: HttpStatusCode.ok,
      body: { currentPage: 0, perPage: 10, total: 1, items: [animal()] },
    })

    const { resources } = await sut.execute({
      propertyId: PROPERTY_ID,
      pagination: { page: 1 },
    })

    expect(resources[0]).toEqual({
      id: 'e0000000-0000-0000-0000-000000000001',
      name: 'Mimosa',
      breed: 'Jersey',
      weight: '450.5',
      ecc: '3.25',
      milkProduction: '',
    })
  })

  it('mantém medidas ausentes como vazias, sem inventar zero', async () => {
    const { sut } = makeSut({
      statusCode: HttpStatusCode.ok,
      body: {
        currentPage: 0,
        perPage: 10,
        total: 1,
        items: [animal({ currentWeight: null, ecc: null, breedName: null })],
      },
    })

    const { resources } = await sut.execute({
      propertyId: PROPERTY_ID,
      pagination: { page: 1 },
    })

    expect(resources[0]).toMatchObject({ weight: '', ecc: '', breed: '' })
  })

  it.each([
    [HttpStatusCode.notFound, NotFoundError],
    [HttpStatusCode.forbidden, ForbiddenError],
    [HttpStatusCode.serverError, UnexpectedError],
  ])('responde %s com %o', async (statusCode, error) => {
    const { sut } = makeSut({ statusCode })

    await expect(
      sut.execute({ propertyId: PROPERTY_ID, pagination: { page: 1 } })
    ).rejects.toBeInstanceOf(error)
  })
})
