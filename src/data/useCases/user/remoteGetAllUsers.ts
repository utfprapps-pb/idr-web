import { IHttpClient, HttpStatusCode } from '@/data/protocols/http'
import {
	BadRequestError,
	ForbiddenError,
	NotFoundError,
	UnexpectedError
} from '@/domain/errors'
import { IGetAllUsers } from '@/domain/useCases'

export class RemoteGetAllUsers implements IGetAllUsers {
	constructor(
		private readonly url: string,
		private readonly httpClient: IHttpClient
	) {}

	execute: IGetAllUsers['execute'] = async (search) => {
		const { statusCode, body } = await this.httpClient.request({
			url: this.url,
			method: 'get',
			filters: {
				name: search
			}
		})

		if (statusCode === HttpStatusCode.ok)
			return body.map((item: any) => ({
				value: item.id,
				label: item.name
			}))

		if (statusCode === HttpStatusCode.forbidden) throw new ForbiddenError()

		if (statusCode === HttpStatusCode.notFound)
			throw new NotFoundError('Usuários')

		if (statusCode === HttpStatusCode.badRequest) throw new BadRequestError()

		throw new UnexpectedError()
	}
}
