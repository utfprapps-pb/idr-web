import { type IHttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, NotFoundError, ForbiddenError } from '@/domain/errors'
import { ITEMS_PER_PAGE } from '@/infra/http'

import type { PropertyModel } from '@/domain/models/propertyModel'
import type { IGetProperties } from '@/domain/useCases/property'

export class RemoteGetAll implements IGetProperties {
	constructor(
		private readonly url: string,
		private readonly httpClient: IHttpClient
	) {}

	execute: IGetProperties['execute'] = async ({
		filters,
		pagination,
		sort
	}) => {
		const { statusCode, body } = await this.httpClient.request({
			url: `${this.url}`,
			method: 'get',
			filters,
			pagination,
			sort
		})

		if (statusCode === HttpStatusCode.ok && !!body) {
			return {
				resources: body.properties.map(
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
				totalPages: Math.ceil(body.totalRegisters / ITEMS_PER_PAGE)
			}
		}

		if (statusCode === HttpStatusCode.notFound)
			throw new NotFoundError('Propriedades')

		if (statusCode === HttpStatusCode.forbidden)
			throw new ForbiddenError(
				'Você não tem permissão para buscar propriedades'
			)

		throw new UnexpectedError()
	}
}
