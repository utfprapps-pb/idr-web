import { Card } from '@/core/presentation/components/ui'

export function WithoutNutritionalBalancing() {
  return (
    <Card.Container>
      <Card.Content>
        <p className="text-center text-sm text-gray-500">
          Selecione um animal para iniciar o balanceamento nutricional.
        </p>
      </Card.Content>
    </Card.Container>
  )
}

WithoutNutritionalBalancing.displayName = 'WithoutNutritionalBalancing'
