import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { UserListApiResponse } from '../../domain/models/users-management-model'
import type { UserRole } from '../../domain/models/users-model'
import type { GetUsersUseCase } from '../../domain/use-cases'

type ApiResponse = {
  items: UserListApiResponse[]
  total: number
  perPage: number
}

export class RemoteGetUsersUseCase implements GetUsersUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<unknown, unknown, ApiResponse>
  ) {}

  execute: GetUsersUseCase['execute'] = async ({
    page,
    terms = '',
    active,
  }) => {
    const params = new URLSearchParams({
      page: String(page - 1),
      perPage: '10',
      sort: 'name',
      direction: 'asc',
      ...(active !== undefined ? { active: String(active) } : {}),
      ...(terms ? { terms } : {}),
    })

    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/search?${params.toString()}`,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        resources: body.items.map((item) => ({
          id: item.id,
          name: item.name,
          username: item.username,
          cityId: item.cityId,
          active: item.active,
          role: item.role as UserRole | undefined,
          createdAt: item.createdAt,
        })),
        totalPages: Math.ceil(body.total / body.perPage) || 1,
      }
    }

    if (statusCode === HttpStatusCode.notFound)
      throw new NotFoundError('Usuários')
    if (statusCode === HttpStatusCode.forbidden) throw new ForbiddenError()

    throw new UnexpectedError()
  }
}
