import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { UserModel } from '@/domain/models'
import { LoginUser, LoginUserParams } from '@/domain/useCases'

export class RemoteLoginUser implements LoginUser {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<UserModel>
	) {}

	async login(params: LoginUserParams): Promise<UserModel> {
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
