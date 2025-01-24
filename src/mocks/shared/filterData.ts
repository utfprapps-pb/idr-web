export const filterData = <TData extends Record<string, string | number>>(
  filters: Record<string, string | number>,
  data: TData[]
) => {
  const filterEntries = Object.entries(filters).filter(([, value]) =>
    Boolean(value)
  )

  if (!filterEntries) return data

  return data.filter((item) =>
    filterEntries.every(([key, value]) => {
      const keyIn = key in item
      if (!keyIn) {
        return false
      }

      const itemValue = item[key as keyof TData]

      return String(itemValue)
        .toLowerCase()
        .includes(String(value).toLowerCase())
    })
  )
}
