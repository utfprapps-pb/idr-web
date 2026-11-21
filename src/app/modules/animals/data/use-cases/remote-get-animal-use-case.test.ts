import { describe, expect, it } from 'vitest'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { HttpClientSpy } from '@/core/data/test/http-client-spy'
import {
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'

import { fromApiDetails } from '../mappers/animal-api-mapper'

import { RemoteGetAnimalUseCase } from './remote-get-animal-use-case'

import type {
  AnimalApiResponse,
  AnimalDetailsModel,
} from '../../domain/models/animals-model'
import type { HttpResponse } from '@/core/data/protocols/http'

const PROPERTY_ID = 'c0000000-0000-0000-0000-000000000001'
const ANIMAL_ID = 'e0000000-0000-0000-0000-000000000002'

const record: AnimalApiResponse = {
  id: ANIMAL_ID,
  propertyId: PROPERTY_ID,
  animalMotherId: 'e0000000-0000-0000-0000-000000000001',
  animalMotherIdentifier: 'Mimosa',
  breedId: 'breed-1',
  breedName: 'Jersey',
  type: 'Grande',
  identifier: 'Charmosa',
  gender: 'Fêmea',
  bornCondition: 'Vivo',
  bornDate: '2019-06-23',
  bornWeight: 32.5,
  previousWeight: null,
  currentWeight: 450.5,
  ecc: 3.25,
}

function makeSut(response: HttpResponse<AnimalApiResponse>) {
  const httpClientSpy = new HttpClientSpy<
    AnimalDetailsModel,
    AnimalApiResponse
  >()
  httpClientSpy.response = response
  const sut = new RemoteGetAnimalUseCase(
    '/properties/:propertyId/animals',
    httpClientSpy
  )

  return { sut, httpClientSpy }
}

describe('RemoteGetAnimalUseCase', () => {
  it('busca o animal da propriedade e devolve o detalhe do mapper', async () => {
    const { sut, httpClientSpy } = makeSut({
      statusCode: HttpStatusCode.ok,
      body: record,
    })

    const animal = await sut.execute({
      propertyId: PROPERTY_ID,
      animalId: ANIMAL_ID,
    })

    expect(httpClientSpy.lastRequest).toMatchObject({
      method: 'get',
      url: `/properties/${PROPERTY_ID}/animals/${ANIMAL_ID}`,
    })
    expect(animal).toEqual(fromApiDetails(record))
  })

  it.each([
    [HttpStatusCode.notFound, NotFoundError],
    [HttpStatusCode.forbidden, ForbiddenError],
    [HttpStatusCode.serverError, UnexpectedError],
  ])('responde %s com %o', async (statusCode, error) => {
    const { sut } = makeSut({ statusCode })

    await expect(
      sut.execute({ propertyId: PROPERTY_ID, animalId: ANIMAL_ID })
    ).rejects.toBeInstanceOf(error)
  })
})
