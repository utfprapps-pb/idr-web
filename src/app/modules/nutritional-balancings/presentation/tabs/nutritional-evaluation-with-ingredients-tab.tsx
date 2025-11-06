import { Card } from '@/core/presentation/components/ui'

import { NutritionalRequirementsTable } from '../components/nutritional-requirements-table'
import { IngredientsContainer } from '../containers/ingredients-container'

import type { NutritionalBalancingEvaluationSchema } from '../validations/nutritional-balancing-form-schema'

type NutritionalEvaluationWithIngredientsTabProps = {
  rows: NutritionalBalancingEvaluationSchema[]
  currentAnimalIndex: number
}

export function NutritionalEvaluationWithIngredientsTab({
  rows,
  currentAnimalIndex,
}: Readonly<NutritionalEvaluationWithIngredientsTabProps>) {
  return (
    <section className="space-y-4">
      <Card.Container className="p-4 gap-4">
        <Card.Header>
          <Card.Title>Informações do Animal</Card.Title>
          <Card.Description>
            Comparação entre exigências e valores oferecidos
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <NutritionalRequirementsTable rows={rows} />
        </Card.Content>
      </Card.Container>

      <IngredientsContainer currentAnimalIndex={currentAnimalIndex} />
    </section>
  )
}

NutritionalEvaluationWithIngredientsTab.displayName =
  'NutritionalEvaluationWithIngredientsTab'
