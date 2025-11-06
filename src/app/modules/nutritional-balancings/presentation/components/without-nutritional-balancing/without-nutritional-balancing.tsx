import { Card } from '@/core/presentation/components/ui'

type WithoutNutritionalBalancingProps = {
  message: string
}

export function WithoutNutritionalBalancing({
  message,
}: WithoutNutritionalBalancingProps) {
  return (
    <Card.Container>
      <Card.Content>
        <p className="text-center text-sm text-gray-500">{message}</p>
      </Card.Content>
    </Card.Container>
  )
}

WithoutNutritionalBalancing.displayName = 'WithoutNutritionalBalancing'
