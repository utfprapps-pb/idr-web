export function filterData<TData extends object>(
  filters: { [key in keyof TData]?: TData[key] },
  data: TData[]
) {
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

      const isDate = itemValue instanceof Date

      if (isDate) {
        const date = new Date(itemValue as unknown as string)
        const valueDate = new Date(value as unknown as string)
        return (
          date.getDate() === valueDate.getDate() &&
          date.getMonth() === valueDate.getMonth() &&
          date.getFullYear() === valueDate.getFullYear()
        )
      }

      return String(itemValue)
        .toLowerCase()
        .includes(String(value).toLowerCase())
    })
  )
}
