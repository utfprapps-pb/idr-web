import { formatNumber } from '@/core/masker'

import type { NutritionalBalancingSchema } from '../validations/nutritional-balancing-form-schema'

export function makeNutritionalSummaryItems(
  summary: NutritionalBalancingSchema['summary']
) {
  return [
    {
      label: 'EE da ração (%)',
      value: formatNumber(summary?.etherExtractPercent ?? '0.00', {
        suffix: '%',
      }),
    },
    {
      label: 'Total de Matéria Seca',
      value: formatNumber(summary?.totalDryMatter ?? '0.00', {
        suffix: 'kg',
      }),
    },
    {
      label: 'Relação MS: Volumoso',
      value: formatNumber(summary?.forageDryMatterPercent ?? '0.00', {
        suffix: '%',
      }),
    },
    {
      label: 'Relação MS: Concentrado',
      value: formatNumber(summary?.concentrateDryMatterPercent ?? '0.00', {
        suffix: '%',
      }),
    },
    {
      label: 'Carboidratos Não Fibrosos (CNF em % MS)',
      value: formatNumber(summary?.nonFibrousCarbohydratesPercent ?? '0.00', {
        suffix: '%',
      }),
    },
    {
      label: 'Relação PDR/NDT (g/kg)',
      value: formatNumber(summary?.rdpTdnRatio ?? '0.00', {
        suffix: 'g/kg',
      }),
    },
  ]
}
