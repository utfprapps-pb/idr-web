import { NutritionalBalancingAnimalInformation } from '../components/nutritional-balancing-animal-information'
import { NutritionalBalancingSummary } from '../components/nutritional-balancing-summary'

import type { Option } from '@/core/domain/types'

type SummaryTabProps = {
  animalInformationItems: Option<string>[]
  nutritionalSummaryItems: Option<string>[]
}

export function SummaryTab({
  animalInformationItems,
  nutritionalSummaryItems,
}: Readonly<SummaryTabProps>) {
  return (
    <section className="space-y-4">
      <NutritionalBalancingAnimalInformation items={animalInformationItems} />

      <NutritionalBalancingSummary items={nutritionalSummaryItems} />
    </section>
  )
}

SummaryTab.displayName = 'SummaryTab'
