import { IHttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, NotFoundError } from '@/domain/errors'
import { IDeleteProperty } from '@/domain/useCases'

export class RemoteDeleteProperty implements IDeleteProperty {
	constructor(
		private readonly url: string,
		private readonly httpClient: IHttpClient
	) {}

	execute: IDeleteProperty['execute'] = async (id) => {
		const { statusCode } = await this.httpClient.request({
			url: `${this.url}/${id}`,
			method: 'delete'
		})

		if (statusCode === HttpStatusCode.noContent) return

		if (statusCode === HttpStatusCode.notFound)
			throw new NotFoundError('Propriedades')

		throw new UnexpectedError()
	}
}
