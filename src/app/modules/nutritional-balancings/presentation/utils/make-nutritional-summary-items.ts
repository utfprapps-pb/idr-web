import { percentMask, floatMask } from '@/core/masker'

import type { NutritionalBalancingFormSchema } from '../validations/nutritional-balancing-form-schema'
import type { UseFormReturn } from 'react-hook-form'

export function makeNutritionalSummaryItems(
  form: UseFormReturn<NutritionalBalancingFormSchema>,
  currentNutritionalBalancingIndex: number
) {
  return [
    {
      label: 'EE da ração (%)',
      value: percentMask(
        form.getValues(
          `nutritionalBalancings.${currentNutritionalBalancingIndex}.summary.etherExtractPercent`
        )
      ),
    },
    {
      label: 'Total de Matéria Seca',
      value: floatMask(
        form.getValues(
          `nutritionalBalancings.${currentNutritionalBalancingIndex}.summary.totalDryMatter`
        ),
        'kg'
      ),
    },
    {
      label: 'Relação MS: Volumoso',
      value: percentMask(
        form.getValues(
          `nutritionalBalancings.${currentNutritionalBalancingIndex}.summary.forageDryMatterPercent`
        )
      ),
    },
    {
      label: 'Relação MS: Concentrado',
      value: percentMask(
        form.getValues(
          `nutritionalBalancings.${currentNutritionalBalancingIndex}.summary.concentrateDryMatterPercent`
        )
      ),
    },
    {
      label: 'Carboidratos Não Fibrosos (CNF em % MS)',
      value: percentMask(
        form.getValues(
          `nutritionalBalancings.${currentNutritionalBalancingIndex}.summary.nonFibrousCarbohydratesPercent`
        )
      ),
    },
    {
      label: 'Relação PDR/NDT (g/kg)',
      value: floatMask(
        form.getValues(
          `nutritionalBalancings.${currentNutritionalBalancingIndex}.summary.rdpTdnRatio`
        ),
        'g/kg'
      ),
    },
  ]
}
