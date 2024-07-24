import { IHttpClient, HttpStatusCode } from '@/data/protocols/http'
import {
	BadRequestError,
	ForbiddenError,
	UnexpectedError
} from '@/domain/errors'
import { IUpdateProperty } from '@/domain/useCases'

export class RemoteUpdateProperty implements IUpdateProperty {
	constructor(
		private readonly url: string,
		private readonly httpClient: IHttpClient
	) {}

	execute: IUpdateProperty['execute'] = async ({ id, ...property }) => {
		const { statusCode } = await this.httpClient.request({
			url: `${this.url}/${id}`,
			method: 'patch',
			body: property
		})

		if (statusCode === HttpStatusCode.noContent) return

		if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

		if (statusCode === HttpStatusCode.forbidden)
			throw new ForbiddenError(
				'Você não tem permissão para editar uma propriedade'
			)

		throw new UnexpectedError()
	}
}
