import { isSameDay } from 'date-fns'

import { isValidDate } from './date'
import { getNestedValue } from './get-nested-value'

import type { Filters } from '@/core/domain/types'

type FilterValue<TData> = {
  field: keyof TData
  value: unknown
}

// Implemented only the LIKE filter for simplicity
export function filterData<TData extends object>(
  filters: Filters<TData>,
  data: TData[]
) {
  const activeFilters = Object.values(filters).filter(
    (filterValue): filterValue is FilterValue<TData> => {
      return (
        !!filterValue &&
        typeof filterValue === 'object' &&
        'value' in filterValue &&
        filterValue.value !== undefined &&
        filterValue.value !== null &&
        filterValue.value !== ''
      )
    }
  )

  if (activeFilters.length === 0) {
    return data
  }

  return data.filter((item) =>
    activeFilters.every((filterValue) => {
      const { field, value } = filterValue
      const itemValue = getNestedValue(item, String(field))

      if (itemValue === null || itemValue === undefined) {
        return false
      }

      if (isValidDate(itemValue)) {
        const valueDate = new Date(String(value))
        return isSameDay(itemValue, valueDate)
      }

      if (Array.isArray(itemValue)) {
        return itemValue.some((element) =>
          String(element).toLowerCase().includes(String(value).toLowerCase())
        )
      }

      if (
        typeof itemValue === 'string' ||
        typeof itemValue === 'number' ||
        typeof itemValue === 'boolean'
      ) {
        return String(itemValue)
          .toLowerCase()
          .includes(String(value).toLowerCase())
      }

      return false
    })
  )
}
