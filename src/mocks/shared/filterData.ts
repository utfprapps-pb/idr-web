export const filterData = <TData extends Record<string, string>>(
	filters: Record<string, string>,
	data: TData[]
) => {
	const filterEntries = Object.entries(filters)

	return data.filter((item) =>
		filterEntries.filter(([key, value]) =>
			item[key as keyof TData].includes(value)
		)
	)
}
