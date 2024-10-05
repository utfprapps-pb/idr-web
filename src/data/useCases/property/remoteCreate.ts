import { type IHttpClient, HttpStatusCode } from '@/data/protocols/http'
import {
	BadRequestError,
	ForbiddenError,
	UnexpectedError
} from '@/domain/errors'

import type { ICreateProperty } from '@/domain/useCases/property'

export class RemoteCreate implements ICreateProperty {
	constructor(
		private readonly url: string,
		private readonly httpClient: IHttpClient
	) {}

	execute: ICreateProperty['execute'] = async (property) => {
		const { statusCode } = await this.httpClient.request({
			url: `${this.url}`,
			method: 'post',
			body: property
		})

		if (statusCode === HttpStatusCode.created) return

		if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

		if (statusCode === HttpStatusCode.forbidden)
			throw new ForbiddenError(
				'Você não tem permissão para criar uma nova propriedade'
			)

		throw new UnexpectedError()
	}
}
