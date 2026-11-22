import { describe, expect, it } from 'vitest'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { HttpClientSpy } from '@/core/data/test/http-client-spy'
import {
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'

import { RemoteGetAnimalMedicationsUseCase } from './remote-get-animal-medications-use-case'

import type {
  AnimalMedicationApiResponse,
  AnimalMedicationModel,
} from '../../../domain/models/animal-medications-model'
import type { HttpResponse } from '@/core/data/protocols/http'
import type { SearchApiResponse } from '@/core/domain/types'

type SearchResponse = SearchApiResponse<AnimalMedicationApiResponse>

const PROPERTY_ID = 'c0000000-0000-0000-0000-000000000001'
const ANIMAL_ID = 'e0000000-0000-0000-0000-000000000001'

function medication(
  overrides: Partial<AnimalMedicationApiResponse> = {}
): AnimalMedicationApiResponse {
  return {
    id: 'm0000000-0000-0000-0000-000000000001',
    animalId: ANIMAL_ID,
    productId: 'p0000000-0000-0000-0000-000000000001',
    productName: 'Ivomec',
    activePrinciple: 'Ivermectina',
    applicationDate: '2024-06-10',
    appliedDose: '10',
    applicationWay: 'IntraMammary',
    ...overrides,
  }
}

function makeSut(response: HttpResponse<SearchResponse>) {
  const httpClientSpy = new HttpClientSpy<
    AnimalMedicationModel,
    AnimalMedicationApiResponse,
    SearchResponse
  >()
  httpClientSpy.response = response

  const sut = new RemoteGetAnimalMedicationsUseCase(
    '/properties/:propertyId/animals/:animalId/medications',
    httpClientSpy
  )

  return { sut, httpClientSpy }
}

const params = {
  propertyId: PROPERTY_ID,
  animalId: ANIMAL_ID,
  pagination: { page: 1 },
}

describe('RemoteGetAnimalMedicationsUseCase', () => {
  it('busca em GET /search com a propriedade e o animal da rota', async () => {
    const { sut, httpClientSpy } = makeSut({
      statusCode: HttpStatusCode.ok,
      body: { currentPage: 0, perPage: 10, total: 0, items: [] },
    })

    await sut.execute({
      ...params,
      sort: { field: 'date', direction: 'desc' },
    })

    const { url, method } = httpClientSpy.lastRequest!
    const [path, query] = url.split('?')
    const search = new URLSearchParams(query)

    expect(method).toBe('get')
    expect(path).toBe(
      `/properties/${PROPERTY_ID}/animals/${ANIMAL_ID}/medications/search`
    )
    expect(search.get('sort')).toBe('applicationDate')
    expect(search.get('direction')).toBe('desc')
  })

  it('exibe o produto e o princípio ativo gravados na medicação', async () => {
    const { sut } = makeSut({
      statusCode: HttpStatusCode.ok,
      body: { currentPage: 0, perPage: 10, total: 1, items: [medication()] },
    })

    const { resources, totalPages } = await sut.execute(params)

    expect(totalPages).toBe(1)
    expect(resources[0]).toMatchObject({
      id: 'm0000000-0000-0000-0000-000000000001',
      date: new Date(2024, 5, 10),
      product: 'Ivomec',
      activeIngredient: 'Ivermectina',
      applicationMethod: 'Intra Mamária',
    })
  })

  it('mostra produto não cadastrado sem princípio ativo como vazio', async () => {
    const { sut } = makeSut({
      statusCode: HttpStatusCode.ok,
      body: {
        currentPage: 0,
        perPage: 10,
        total: 1,
        items: [
          medication({
            productId: null,
            productName: 'Remédio caseiro',
            activePrinciple: null,
          }),
        ],
      },
    })

    const { resources } = await sut.execute(params)

    expect(resources[0]).toMatchObject({
      product: 'Remédio caseiro',
      activeIngredient: '',
    })
  })

  it.each([
    [HttpStatusCode.notFound, NotFoundError],
    [HttpStatusCode.forbidden, ForbiddenError],
    [HttpStatusCode.serverError, UnexpectedError],
  ])('responde %s com %o', async (statusCode, error) => {
    const { sut } = makeSut({ statusCode })

    await expect(sut.execute(params)).rejects.toBeInstanceOf(error)
  })
})
