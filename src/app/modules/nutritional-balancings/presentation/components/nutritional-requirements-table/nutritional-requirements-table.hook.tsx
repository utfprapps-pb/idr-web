import { useMemo } from 'react'

import { type ColumnDef } from '@tanstack/react-table'

import { formatNumber } from '@/core/masker'
import { Badge } from '@/core/presentation/components/ui/badge'

import type { NutritionalBalancingEvaluationSchema } from '../../validations/nutritional-balancing-form-schema'

const evaluationStatusMap = {
  ABOVE: 'Acima',
  BELOW: 'Abaixo',
  NORMAL: 'Normal',
} as const

const evaluationStatusVariant = {
  ABOVE: 'destructive',
  BELOW: 'destructive',
  NORMAL: 'secondary',
} as const

export function useNutritionalRequirementsTable() {
  const columns = useMemo<ColumnDef<NutritionalBalancingEvaluationSchema>[]>(
    () => [
      {
        accessorKey: 'nutrientName',
        header: 'Nutriente',
      },
      {
        accessorKey: 'requiredValue',
        header: 'Exigência',
        cell: ({ getValue }) =>
          formatNumber(getValue<number>(), { suffix: 'kg' }),
      },
      {
        accessorKey: 'providedValue',
        header: 'Oferecido',
        cell: ({ getValue }) =>
          formatNumber(getValue<number>(), { suffix: 'kg' }),
      },
      {
        accessorKey: 'evaluationStatus',
        header: 'Status',
        cell: ({ getValue }) => {
          const status = getValue<keyof typeof evaluationStatusMap>()
          const label = evaluationStatusMap[status] || status
          const variant = evaluationStatusVariant[status] || 'default'

          return (
            <Badge
              variant={
                variant as 'default' | 'secondary' | 'destructive' | 'outline'
              }
            >
              {label}
            </Badge>
          )
        },
      },
    ],
    []
  )

  return {
    columns,
  }
}
