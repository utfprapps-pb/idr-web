import { describe, expect, it } from 'vitest'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { HttpClientSpy } from '@/core/data/test/http-client-spy'
import {
  BadRequestError,
  ForbiddenError,
  UnexpectedError,
} from '@/core/domain/errors'

import { toCreateRequest } from '../mappers/animal-api-mapper'

import { RemoteCreateAnimalUseCase } from './remote-create-animal-use-case'

import type { AnimalDetailsModel } from '../../domain/models/animals-model'

const PROPERTY_ID = 'c0000000-0000-0000-0000-000000000001'

const animal: AnimalDetailsModel = {
  name: 'Charmosa',
  breed: { value: 'breed-1', label: 'Jersey' },
  type: 'Grande',
  gender: '',
  mother: { value: '', label: '' },
  bornDate: new Date(2019, 5, 23),
  bornWeight: '',
  bornCondition: 'Vivo',
}

function makeSut(statusCode = HttpStatusCode.ok) {
  const httpClientSpy = new HttpClientSpy()
  httpClientSpy.response = { statusCode }
  const sut = new RemoteCreateAnimalUseCase(
    '/properties/:propertyId/animals',
    httpClientSpy
  )

  return { sut, httpClientSpy }
}

describe('RemoteCreateAnimalUseCase', () => {
  it('cria por POST com o corpo do mapper, sem propertyId', async () => {
    const { sut, httpClientSpy } = makeSut()

    await sut.execute({
      propertyId: PROPERTY_ID,
      animal,
    })

    expect(httpClientSpy.lastRequest).toMatchObject({
      method: 'post',
      url: `/properties/${PROPERTY_ID}/animals`,
      body: toCreateRequest(animal),
    })
  })

  it.each([
    [HttpStatusCode.badRequest, BadRequestError],
    [HttpStatusCode.forbidden, ForbiddenError],
    [HttpStatusCode.serverError, UnexpectedError],
  ])('responde %s com %o', async (statusCode, error) => {
    const { sut } = makeSut(statusCode)

    await expect(
      sut.execute({
        propertyId: PROPERTY_ID,
        animal,
      })
    ).rejects.toBeInstanceOf(error)
  })
})
