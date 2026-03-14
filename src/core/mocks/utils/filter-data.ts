import { isValidDate } from './date'
import { getNestedValue } from './get-nested-value'
import { valueEquals } from './value-equals'
import { valueIncludes } from './value-includes'

import type { FilterType } from '@/core/domain/types'
import type { MockFilter } from '@/core/mocks/types/mock-params-type'

type ActiveFilter<TData> = {
  field: keyof TData
  value: unknown
  type: FilterType
}

// Supports LIKE (default) and NOT_IN. Extend as needed for other operators.
export function filterData<TData extends object>(
  filters: Array<MockFilter<TData>>,
  data: TData[]
) {
  const activeFilters: ActiveFilter<TData>[] = filters.reduce((acc, filter) => {
    if (!filter || typeof filter !== 'object') return acc

    const { field, value, type } = filter
    if (value === undefined || value === null || value === '') return acc

    acc.push({
      field: field as keyof TData,
      value,
      type: (type ?? 'LIKE') as FilterType,
    })

    return acc
  }, [] as ActiveFilter<TData>[])

  if (activeFilters.length === 0) {
    return data
  }

  return data.filter((item) =>
    activeFilters.every(({ field, value, type }) => {
      const itemValue = getNestedValue(item, String(field))

      if (itemValue === null || itemValue === undefined) {
        return false
      }

      if (type === 'NOT_IN') {
        const values = Array.isArray(value) ? value : [value]

        if (Array.isArray(itemValue)) {
          return itemValue.every(
            (item) => !values.some((value) => valueEquals(item, value))
          )
        }

        return !values.some((value) => valueEquals(itemValue, value))
      }

      if (isValidDate(itemValue)) {
        return valueEquals(itemValue, value)
      }

      if (Array.isArray(itemValue)) {
        return valueIncludes(itemValue, value)
      }

      if (
        typeof itemValue === 'string' ||
        typeof itemValue === 'number' ||
        typeof itemValue === 'boolean'
      ) {
        return valueIncludes(itemValue, value)
      }

      return false
    })
  )
}
