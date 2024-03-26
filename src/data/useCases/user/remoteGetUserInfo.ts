import { IHttpClient, HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { UserInfoModel } from '@/domain/models'
import { IGetUserInfo } from '@/domain/useCases'

export class RemoteGetUserInfo implements IGetUserInfo {
	constructor(
		private readonly url: string,
		private readonly httpClient: IHttpClient<UserInfoModel>
	) {}

	async execute(): Promise<UserInfoModel> {
		const { statusCode, body } = await this.httpClient.request({
			url: this.url,
			method: 'get'
		})

		if (statusCode === HttpStatusCode.unauthorized)
			throw new InvalidCredentialsError()

		if (statusCode === HttpStatusCode.ok && !!body) return body

		throw new UnexpectedError()
	}
}
