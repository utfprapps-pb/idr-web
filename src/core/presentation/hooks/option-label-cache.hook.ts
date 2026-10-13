import { useCallback, useEffect, useState } from 'react'

import type { Option } from '@/core/domain/types'

type Props<TValue extends string | number> = {
  options: Option<TValue>[]
}

export function useOptionLabelCache<TValue extends string | number>({
  options,
}: Props<TValue>) {
  const [labelsById, setLabelsById] = useState<Record<string, string>>({})

  useEffect(() => {
    setLabelsById((current) => {
      let hasChanges = false
      const next = { ...current }

      options.forEach((option) => {
        const id = String(option.value)
        if (next[id] === option.label) return
        next[id] = option.label
        hasChanges = true
      })

      return hasChanges ? next : current
    })
  }, [options])

  const getLabel = useCallback(
    (id: string) => labelsById[id] ?? id,
    [labelsById]
  )

  return { getLabel }
}
