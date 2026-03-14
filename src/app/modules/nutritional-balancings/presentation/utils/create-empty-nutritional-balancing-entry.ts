import type { NutritionalBalancingSchema } from '../validations/nutritional-balancing-form-schema'

export function createEmptyNutritionalBalancingEntry(
  nutritionalBalancing: Partial<NutritionalBalancingSchema>
) {
  return {
    animal: {
      id: 0,
      name: '',
      breed: '',
      ecc: '',
      weight: '',
      milkProduction: '',
      estimatedMilkProduction: '',
      ...nutritionalBalancing.animal,
    },
    summary: {
      totalDryMatter: '0.00',
      etherExtractPercent: '0.00',
      forageDryMatterPercent: '0.00',
      concentrateDryMatterPercent: '0.00',
      nonFibrousCarbohydratesPercent: '0.00',
      rdpTdnRatio: '0.00',
      ...nutritionalBalancing.summary,
    },
    evaluations: nutritionalBalancing.evaluations ?? [
      {
        nutrientName: 'IMS (Ingestão de Matéria Seca)',
        providedValue: '0.00',
        requiredValue: '0.00',
        evaluationStatus: 'NORMAL' as const,
      },
      {
        nutrientName: 'NDT (Nutrientes Digestíveis Totais)',
        providedValue: '0.00',
        requiredValue: '0.00',
        evaluationStatus: 'NORMAL' as const,
      },
      {
        nutrientName: 'PB (Proteína Bruta)',
        providedValue: '0.00',
        requiredValue: '0.00',
        evaluationStatus: 'NORMAL' as const,
      },
      {
        nutrientName: 'Ca (Cálcio)',
        providedValue: '0.00',
        requiredValue: '0.00',
        evaluationStatus: 'NORMAL' as const,
      },
      {
        nutrientName: 'P (Fósforo)',
        providedValue: '0.00',
        requiredValue: '0.00',
        evaluationStatus: 'NORMAL' as const,
      },
    ],
    ingredientGroups: nutritionalBalancing.ingredientGroups ?? [
      {
        category: 'FORAGE' as const,
        ingredients: [],
      },
      {
        category: 'CONCENTRATE' as const,
        ingredients: [],
      },
      {
        category: 'MINERAL' as const,
        ingredients: [],
      },
    ],
    ...nutritionalBalancing,
  }
}
