import { Card } from '@/core/presentation/components/ui'

import type { Option } from '@/core/domain/types'

type NutritionalBalancingAnimalInformationProps = {
  items: Option<string>[]
}

export function NutritionalBalancingAnimalInformation({
  items,
}: Readonly<NutritionalBalancingAnimalInformationProps>) {
  return (
    <Card.Container>
      <Card.Header>
        <Card.Title>Informações do Animal</Card.Title>
      </Card.Header>
      <Card.Content className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full items-start">
        {items.map((item) => (
          <div key={item.value} className="flex flex-col gap-1 min-w-0">
            <span className="text-sm font-medium text-slate-500">
              {item.label}
            </span>
            <span className="font-semibold">{item.value}</span>
          </div>
        ))}
      </Card.Content>
    </Card.Container>
  )
}

NutritionalBalancingAnimalInformation.displayName =
  'NutritionalBalancingAnimalInformation'
