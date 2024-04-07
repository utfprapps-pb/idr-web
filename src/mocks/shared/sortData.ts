import { SortDirection } from '@/data/protocols/http'

export const sortData = <TData extends Record<string, string>>(
	sort: {
		direction: SortDirection
		field: string
	},
	data: TData[]
) =>
	data.sort((prevItem, nextItem) => {
		const fieldToSort = sort.field as keyof TData

		if (sort.direction === 'asc') {
			return prevItem[fieldToSort] < nextItem[fieldToSort] ? -1 : 1
		}

		return prevItem[fieldToSort] > nextItem[fieldToSort] ? -1 : 1
	})
