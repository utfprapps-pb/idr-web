import { HttpRequest, SortDirection } from '@/data/protocols/http'
import { PropertyModel } from '@/domain/models'

export type GetPropertiesParams = {
	filters?: {
		name: string
	}
	sort?: {
		direction: SortDirection
		field: keyof PropertyModel
	}
	pagination: HttpRequest['pagination']
}

export type GetPropertiesResponse = {
	properties: PropertyModel[]
	totalPages: number
}

export interface IGetProperties {
	execute: (params: GetPropertiesParams) => Promise<GetPropertiesResponse>
}
