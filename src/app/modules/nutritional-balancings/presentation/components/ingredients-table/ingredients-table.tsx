import { DotIcon } from 'lucide-react'

import { DataTable } from '@/core/presentation/components/ui'
import { cn } from '@/core/utils'

import { useIngredientsTable } from './ingredients-table.hook'

import type { IngredientItemSchema } from '../../validations/nutritional-balancing-form-schema'

type IngredientsTableProps = {
  category: string
  rows: IngredientItemSchema[]
  categoryClassName?: string
  pointerClassName?: string
}

export function IngredientsTable({
  category,
  rows,
  categoryClassName,
  pointerClassName,
}: Readonly<IngredientsTableProps>) {
  const { columns } = useIngredientsTable()

  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <DotIcon className={cn(pointerClassName)} />
        <span className={cn('text-sm font-semibold', categoryClassName)}>
          {category}
        </span>
      </div>
      <DataTable<IngredientItemSchema> columns={columns} data={rows} noBorder />
    </section>
  )
}

IngredientsTable.displayName = 'IngredientsTable'
