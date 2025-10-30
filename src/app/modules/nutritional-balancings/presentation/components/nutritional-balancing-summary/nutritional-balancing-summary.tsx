import { Card } from '@/core/presentation/components/ui'

import type { Option } from '@/core/domain/types'

type NutritionalBalancingSummaryProps = {
  items: Option<string>[]
}

export function NutritionalBalancingSummary({
  items,
}: Readonly<NutritionalBalancingSummaryProps>) {
  return (
    <Card.Container>
      <Card.Header>
        <Card.Title>Resumo Nutricional</Card.Title>
      </Card.Header>
      <Card.Content className="grid grid-cols-2 max-md:grid-cols-1 gap-4 w-full items-start">
        {items.map((item) => (
          <Card.Container key={item.value} className="shadow-none gap-1 p-4">
            <span className="text-sm font-medium text-slate-500">
              {item.label}
            </span>
            <span className="font-bold text-primary-500 text-3xl">
              {item.value}
            </span>
          </Card.Container>
        ))}
      </Card.Content>
    </Card.Container>
  )
}

NutritionalBalancingSummary.displayName = 'NutritionalBalancingSummary'
