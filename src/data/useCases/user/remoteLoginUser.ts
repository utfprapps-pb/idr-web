import { IHttpClient, HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { ILoginUser } from '@/domain/useCases'

export class RemoteLoginUser implements ILoginUser {
	constructor(
		private readonly url: string,
		private readonly httpClient: IHttpClient
	) {}

	execute: ILoginUser['execute'] = async (params) => {
		const payload = {
			username: params.email,
			password: params.password
		}

		const { statusCode, body } = await this.httpClient.request({
			url: this.url,
			method: 'post',
			body: payload
		})

		if (statusCode === HttpStatusCode.unauthorized)
			throw new InvalidCredentialsError()

		if (statusCode === HttpStatusCode.ok && !!body)
			return {
				name: body.user.displayName,
				token: body.token
			}

		throw new UnexpectedError()
	}
}
