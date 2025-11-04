import { Card } from '@/core/presentation/components/ui'

import { NutritionalRequirementsTable } from '../components/nutritional-requirements-table'

import type { NutritionalBalancingEvaluationSchema } from '../validations/nutritional-balancing-form-schema'

type NutritionalEvaluationTabProps = {
  rows: NutritionalBalancingEvaluationSchema[]
}

export function NutritionalEvaluationTab({
  rows,
}: Readonly<NutritionalEvaluationTabProps>) {
  return (
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
  )
}

NutritionalEvaluationTab.displayName = 'NutritionalEvaluationTab'
