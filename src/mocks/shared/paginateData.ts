export const paginateData = <TData extends Record<string, string>>(
	pagination: {
		page: number
		perPage?: number
	},
	data: TData[]
) => {
	const { page, perPage = 10 } = pagination

	return data.slice((page - 1) * perPage, page * perPage)
}
