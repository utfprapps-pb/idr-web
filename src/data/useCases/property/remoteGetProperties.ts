import { IHttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, NotFoundError } from '@/domain/errors'
import { PropertyModel } from '@/domain/models'
import {
	GetPropertiesParams,
	GetPropertiesResponse,
	IGetProperties
} from '@/domain/useCases'

export class RemoteGetProperties implements IGetProperties {
	constructor(
		private readonly url: string,
		private readonly httpClient: IHttpClient
	) {}

	async execute({
		filters,
		pagination,
		sort
	}: GetPropertiesParams): Promise<GetPropertiesResponse> {
		const { statusCode, body, itemsPerPage } = await this.httpClient.request({
			url: `${this.url}`,
			method: 'get',
			filters,
			pagination,
			sort
		})

		if (statusCode === HttpStatusCode.ok && !!body) {
			return {
				properties: body.properties.map(
					(item: any) =>
						({
							id: item.id,
							name: item.name,
							producer: item.producer,
							county: {
								city: item.city,
								state: item.state
							}
						}) as PropertyModel
				),
				totalPages: Math.ceil(body.totalRegisters / itemsPerPage)
			}
		}

		if (statusCode === HttpStatusCode.notFound)
			throw new NotFoundError('Propriedades')

		throw new UnexpectedError()
	}
}
