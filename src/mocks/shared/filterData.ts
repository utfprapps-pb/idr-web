export const filterData = <TData extends Record<string, string>>(
  filters: Record<string, string>,
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
      return itemValue.toLowerCase().includes(value.toLowerCase())
    })
  )
}
