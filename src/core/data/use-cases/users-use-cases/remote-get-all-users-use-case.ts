import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'

import type {
  UserApiResponse,
  UserModel,
} from '@/core/domain/models/users-model'
import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'
import type { GetAllUsersUseCase } from '@/core/domain/use-cases/users-use-cases'

export class RemoteGetAllUsersUseCase implements GetAllUsersUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      UserModel,
      UserApiResponse,
      ListApiResponse<UserApiResponse[]>
    >
  ) {}

  execute: GetAllUsersUseCase['execute'] = async ({ filters }) => {
    const mapApiProperties: MapApiProperties<UserModel, UserApiResponse> = {
      id: 'id',
      name: 'displayName',
    }

    const { statusCode, body } = await this.httpClient.request({
      url: `${this.url}/search`,
      method: 'post',
      filters,
      mapApiProperties,
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      return {
        resources: body.content.map((item) => ({
          id: item.id,
          name: item.displayName,
        })),
        totalPages: Math.ceil(body.numberOfElements / body.pageable.pageSize),
      }
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError()
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Usuários')
    }

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    throw new UnexpectedError()
  }
}
