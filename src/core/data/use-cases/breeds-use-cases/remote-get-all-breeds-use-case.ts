import { type HttpClient, HttpStatusCode } from '@/core/data/protocols/http'
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'
import { BreedApiModel, BreedModel } from '@/core/domain/models/breed-model'
import { Option } from '@/core/domain/types'

import type { GetAllBreedsUseCase } from '@/core/domain/use-cases/breeds-use-cases'

export class RemoteGetAllBreedsUseCase implements GetAllBreedsUseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      BreedModel,
      BreedApiModel,
      BreedApiModel[]
    >
  ) {}

  execute: GetAllBreedsUseCase['execute'] = async () => {
    const { statusCode, body } = await this.httpClient.request({
      url: this.url,
      method: 'get',
    })

    if (statusCode === HttpStatusCode.ok && !!body) {
      console.log(body); // TODO: Remover 
      let response: Option[] = [];
      body.forEach((item) => {
        response.push({label: item.breedName, value: item.id.toString()} as Option);
      });
      console.log(response);
      return response;
    }

    if (statusCode === HttpStatusCode.forbidden) {
      throw new ForbiddenError()
    }

    if (statusCode === HttpStatusCode.notFound) {
      throw new NotFoundError('Raças')
    }

    if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

    throw new UnexpectedError()
  }
}
