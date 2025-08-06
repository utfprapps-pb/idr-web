import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'

import type { UserApiResponse } from '@/core/domain/models/users-model'
import type {
  ListApiResponse,
  MapApiProperties,
  Option,
} from '@/core/domain/types'
import type { GetAllUsersUseCase } from '@/core/domain/use-cases/users-use-cases'

export class RemoteGetAllUsersUseCase implements GetAllUsersUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      Option,
      UserApiResponse,
      ListApiResponse<UserApiResponse[]>
    >
  ) {}

  execute: GetAllUsersUseCase['execute'] = async ({ filters }) => {
    const mapApiProperties: MapApiProperties<Option, UserApiResponse> = {
      value: 'id',
      label: 'displayName',
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
          value: item.id,
          label: item.displayName,
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
