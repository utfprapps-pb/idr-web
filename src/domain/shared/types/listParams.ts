import { SortDirection } from '@tanstack/react-table'

import { HttpRequest } from '@/data/protocols/http'

export type Filters<TKeyOfModel extends keyof any = string> = Record<
	TKeyOfModel,
	string
>

export type Sort<TKeyOfModel extends keyof any = string> = {
	direction: SortDirection
	field: TKeyOfModel
}

export interface IListParams<TKeyOfModel extends keyof any = string> {
	filters?: Filters
	sort?: Sort<TKeyOfModel>
	pagination: HttpRequest['pagination']
}
