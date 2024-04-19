import { IHttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, NotFoundError, ForbiddenError } from '@/domain/errors'
import { IGetProperty } from '@/domain/useCases'

export class RemoteGetProperty implements IGetProperty {
	constructor(
		private readonly url: string,
		private readonly httpClient: IHttpClient
	) {}

	execute: IGetProperty['execute'] = async (id) => {
		const { statusCode, body } = await this.httpClient.request({
			url: `${this.url}/${id}`,
			method: 'get'
		})

		if (statusCode === HttpStatusCode.ok && !!body) {
			return {
				...body
			}
		}

		if (statusCode === HttpStatusCode.notFound)
			throw new NotFoundError('Propriedades')

		if (statusCode === HttpStatusCode.forbidden)
			throw new ForbiddenError(
				'Você não tem permissão para buscar uma propriedade'
			)

		throw new UnexpectedError()
	}
}
