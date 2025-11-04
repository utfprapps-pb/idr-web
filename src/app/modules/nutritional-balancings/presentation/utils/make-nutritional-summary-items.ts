import { formatNumber } from '@/core/masker'

import type { NutritionalBalancingFormSchema } from '../validations/nutritional-balancing-form-schema'
import type { UseFormReturn } from 'react-hook-form'

export function makeNutritionalSummaryItems(
  form: UseFormReturn<NutritionalBalancingFormSchema>,
  currentNutritionalBalancingIndex: number
) {
  return [
    {
      label: 'EE da ração (%)',
      value: formatNumber(
        form.getValues(
          `nutritionalBalancings.${currentNutritionalBalancingIndex}.summary.etherExtractPercent`
        ),
        {
          suffix: '%',
        }
      ),
    },
    {
      label: 'Total de Matéria Seca',
      value: formatNumber(
        form.getValues(
          `nutritionalBalancings.${currentNutritionalBalancingIndex}.summary.totalDryMatter`
        ),
        {
          suffix: 'kg',
        }
      ),
    },
    {
      label: 'Relação MS: Volumoso',
      value: formatNumber(
        form.getValues(
          `nutritionalBalancings.${currentNutritionalBalancingIndex}.summary.forageDryMatterPercent`
        ),
        {
          suffix: '%',
        }
      ),
    },
    {
      label: 'Relação MS: Concentrado',
      value: formatNumber(
        form.getValues(
          `nutritionalBalancings.${currentNutritionalBalancingIndex}.summary.concentrateDryMatterPercent`
        ),
        {
          suffix: '%',
        }
      ),
    },
    {
      label: 'Carboidratos Não Fibrosos (CNF em % MS)',
      value: formatNumber(
        form.getValues(
          `nutritionalBalancings.${currentNutritionalBalancingIndex}.summary.nonFibrousCarbohydratesPercent`
        ),
        {
          suffix: '%',
        }
      ),
    },
    {
      label: 'Relação PDR/NDT (g/kg)',
      value: formatNumber(
        form.getValues(
          `nutritionalBalancings.${currentNutritionalBalancingIndex}.summary.rdpTdnRatio`
        ),
        {
          suffix: 'g/kg',
        }
      ),
    },
  ]
}
