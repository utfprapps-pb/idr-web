import { describe, expect, it } from 'vitest'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { HttpClientSpy } from '@/core/data/test/http-client-spy'

import { RemoteGetAnimalChildbirthsUseCase } from './remote-get-animal-childbirths-use-case'

import type {
  AnimalChildbirthApiResponse,
  AnimalChildbirthModel,
} from '../../../domain/models/animal-childbirths-model'
import type { SearchApiResponse } from '@/core/domain/types'

type SearchResponse = SearchApiResponse<AnimalChildbirthApiResponse>

const PROPERTY_ID = 'c0000000-0000-0000-0000-000000000001'
const ANIMAL_ID = 'e0000000-0000-0000-0000-000000000001'

function childbirth(
  id: string,
  gender: AnimalChildbirthApiResponse['gender'],
  condition: AnimalChildbirthApiResponse['condition']
): AnimalChildbirthApiResponse {
  return {
    id,
    animalId: ANIMAL_ID,
    childbirthDate: '2024-06-10',
    gender,
    weight: 32.5,
    condition,
    breedId: 'breed-1',
    calfId: null,
    breedName: 'Jersey',
    calfIdentifier: null,
  }
}

function makeSut(items: AnimalChildbirthApiResponse[]) {
  const httpClientSpy = new HttpClientSpy<
    AnimalChildbirthModel,
    AnimalChildbirthApiResponse,
    SearchResponse
  >()
  httpClientSpy.response = {
    statusCode: HttpStatusCode.ok,
    body: { currentPage: 0, perPage: 10, total: items.length, items },
  }

  return new RemoteGetAnimalChildbirthsUseCase(
    '/properties/:propertyId/animals/:animalId/childbirths',
    httpClientSpy
  )
}

describe('RemoteGetAnimalChildbirthsUseCase', () => {
  it('traduz sexo e condição para a tabela', async () => {
    const { resources } = await makeSut([
      childbirth('c1', 'MALE', 'ALIVE'),
      childbirth('c2', 'FEMALE', 'DEAD'),
    ]).execute({
      propertyId: PROPERTY_ID,
      animalId: ANIMAL_ID,
      pagination: { page: 1 },
    })

    expect(resources).toMatchObject([
      { gender: 'Macho', condition: 'Vivo' },
      { gender: 'Fêmea', condition: 'Morto' },
    ])
  })

  it('deixa vazios sexo e condição nulos (não mostra "Fêmea"/"Morto")', async () => {
    const { resources } = await makeSut([childbirth('c1', null, null)]).execute(
      {
        propertyId: PROPERTY_ID,
        animalId: ANIMAL_ID,
        pagination: { page: 1 },
      }
    )

    expect(resources[0]).toMatchObject({ gender: '', condition: '' })
  })
})
