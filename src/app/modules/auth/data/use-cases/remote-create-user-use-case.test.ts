import { describe, expect, it } from 'vitest'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { HttpClientSpy } from '@/core/data/test/http-client-spy'
import { BadRequestError } from '@/core/domain/errors'

import { RemoteCreateUserUseCase } from './remote-create-user-use-case'

import type { CreateUserModel } from '../../domain/models/auth-model'

const params: CreateUserModel = {
  name: 'Técnico',
  email: 'tecnico@idr.com',
  password: 'Senha@123',
  confirmPassword: 'Senha@123',
  cpf: '111.444.777-35',
  phone: '(43) 99999-0000',
  graduationYear: '2000',
  professionalRegister: '123',
  cep: '86000-000',
  street: 'Rua',
  cityId: { label: 'Londrina', value: 'city-1' },
}

describe('RemoteCreateUserUseCase — erros no formato Problem Details', () => {
  it('400 usa o detail da API', async () => {
    const httpClient = new HttpClientSpy<void>()
    httpClient.response = {
      statusCode: HttpStatusCode.badRequest,
      body: {
        type: 'urn:idr:problem:validacao',
        title: 'Erro de validação',
        detail: 'CPF já cadastrado',
      } as never,
    }
    const sut = new RemoteCreateUserUseCase('/v1/users', httpClient)

    await expect(sut.execute(params)).rejects.toEqual(
      new BadRequestError('CPF já cadastrado')
    )
  })
})
