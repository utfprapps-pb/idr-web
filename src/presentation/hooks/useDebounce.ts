import { useEffect, useState } from 'react'

import { useTimeoutFn } from './useTimeout'

type Props<T> = {
  value: T
  delayInMs?: number
}

export const useDebounce = <T>({ value, delayInMs = 500 }: Props<T>) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  const { set } = useTimeoutFn(() => setDebouncedValue(value), delayInMs)

  useEffect(set, [value, delayInMs, set])

  return debouncedValue
}
