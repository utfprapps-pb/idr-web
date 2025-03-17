import { SortDirection } from '@/core/data/protocols/http'

export function sortData<TData extends Record<string, string | number>>(
  sort: {
    direction: SortDirection
    field: string
  },
  data: TData[]
) {
  return data.sort((prevItem, nextItem) => {
    const fieldToSort = sort.field as keyof TData

    if (sort.direction === 'asc') {
      return prevItem[fieldToSort] < nextItem[fieldToSort] ? -1 : 1
    }

    return prevItem[fieldToSort] > nextItem[fieldToSort] ? -1 : 1
  })
}
