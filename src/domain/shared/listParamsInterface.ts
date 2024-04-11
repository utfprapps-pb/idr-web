import { SortDirection } from '@tanstack/react-table'

import { HttpRequest } from '@/data/protocols/http'

export interface IListParams<TKeyOfModel extends string = string> {
	filters?: Record<TKeyOfModel, string>
	sort?: {
		direction: SortDirection
		field: TKeyOfModel
	}
	pagination: HttpRequest['pagination']
}
