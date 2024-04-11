export const filterData = <TData extends Record<string, string>>(
	filters: Record<string, string>,
	data: TData[]
) => {
	const filterEntries = Object.entries(filters)

	return data.filter((item) =>
		filterEntries.every(([key, value]) => {
			const itemValue = item[key as keyof TData]
			return itemValue.toLowerCase().includes(value.toLowerCase())
		})
	)
}
