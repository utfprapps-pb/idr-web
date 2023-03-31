import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { CreateUserModel } from '@/domain/models'
import { CreateUser } from '@/domain/useCases'

export class RemoteCreateUser implements CreateUser {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<void>
	) {}

	async create(params: CreateUserModel): Promise<void> {
		const payload = {
			...params
		}

		const { statusCode, body } = await this.httpClient.request({
			url: this.url,
			method: 'post',
			body: payload
		})

		if (statusCode === HttpStatusCode.unauthorized)
			throw new InvalidCredentialsError()

		if (statusCode === HttpStatusCode.ok && !!body) return body

		throw new UnexpectedError()
	}
}
