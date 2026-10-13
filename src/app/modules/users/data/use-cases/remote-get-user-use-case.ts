import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { UserDetailApiResponse } from '../../domain/models/users-management-model'
import type { UserRole } from '../../domain/models/users-model'
import type { GetUserUseCase } from '../../domain/use-cases'

export class RemoteGetUserUseCase implements GetUserUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      unknown,
      unknown,
      UserDetailApiResponse
    >
  ) {}

  execute: GetUserUseCase['execute'] = async ({ userId }) => {
    const { statusCode, body } = await this.httpClient.request({
      url: this.url.replace(':userId', userId),
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        id: body.id,
        name: body.name,
        username: body.username,
        cpf: body.cpf,
        phone: body.phone,
        cityId: body.cityId,
        active: body.active,
        createdAt: body.createdAt,
        role: body.role as UserRole,
        readOnly: body.readOnly,
        regionIds: body.regionIds ?? [],
        cityIds: body.cityIds ?? [],
      }
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Usuário')
    if (statusCode === HttpStatusCode.forbidden) throw new ForbiddenError()

    throw new UnexpectedError()
  }
}
