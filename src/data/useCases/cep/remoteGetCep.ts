import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, NotFoundError } from '@/domain/errors'
import { CepModel } from '@/domain/models'
import { GetCep } from '@/domain/useCases/cep'

export class RemoteGetCep implements GetCep {
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<CepModel>
	) {}

	async get(cep: string): Promise<CepModel> {
		const { statusCode, body } = await this.httpClient.request({
			url: `${this.url}/${cep}`,
			method: 'get'
		})

		if (statusCode === HttpStatusCode.ok && !!body) return body

		if (statusCode === HttpStatusCode.notFound) throw new NotFoundError('CEP')

		throw new UnexpectedError()
	}
}
