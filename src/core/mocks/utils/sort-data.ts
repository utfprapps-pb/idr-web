import { getNestedValue } from './get-nested-value'

import type { ApiSort } from '@/core/domain/types'

export function sortData<TData extends object>(
  sort: ApiSort<TData>,
  data: TData[]
) {
  if (!sort?.field) {
    return data
  }

  const sortedData = [...data]

  sortedData.sort((prevItem, nextItem) => {
    const fieldPath = String(sort.field)

    const prevValue = getNestedValue(prevItem, fieldPath)

    const nextValue = getNestedValue(nextItem, fieldPath)

    const direction = (sort.type || 'asc').toLowerCase()

    const directionMultiplier = direction === 'asc' ? 1 : -1

    if (prevValue === null || prevValue === undefined) return 1
    if (nextValue === null || nextValue === undefined) return -1

    if (typeof prevValue === 'string' && typeof nextValue === 'string') {
      return prevValue.localeCompare(nextValue) * directionMultiplier
    }

    if (
      (typeof prevValue === 'number' && typeof nextValue === 'number') ||
      (prevValue instanceof Date && nextValue instanceof Date)
    ) {
      if (prevValue < nextValue) return -1 * directionMultiplier
      if (prevValue > nextValue) return 1 * directionMultiplier
      return 0
    }

    return 0
  })

  return sortedData
}
