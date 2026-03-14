import { DataTable } from '@/core/presentation/components/ui'

import { useNutritionalRequirementsTable } from './nutritional-requirements-table.hook'

import type { NutritionalBalancingEvaluationSchema } from '../../validations/nutritional-balancing-form-schema'

type NutritionalRequirementsTableProps = {
  rows: NutritionalBalancingEvaluationSchema[]
}

export function NutritionalRequirementsTable({
  rows,
}: Readonly<NutritionalRequirementsTableProps>) {
  const { columns } = useNutritionalRequirementsTable()

  return (
    <DataTable<NutritionalBalancingEvaluationSchema>
      columns={columns}
      data={rows}
    />
  )
}

NutritionalRequirementsTable.displayName = 'NutritionalRequirementsTable'
