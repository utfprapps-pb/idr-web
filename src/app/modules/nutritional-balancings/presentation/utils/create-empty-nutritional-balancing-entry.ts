import type { NutritionalBalancingSchema } from '../validations/nutritional-balancing-form-schema'

export function createEmptyNutritionalBalancingEntry(
  nutritionalBalancing: Partial<NutritionalBalancingSchema>
) {
  return {
    ...nutritionalBalancing,
    animal: {
      id: 0,
      name: '',
      breed: '',
      ecc: '',
      weight: '',
      milkProduction: '',
      ...nutritionalBalancing.animal,
      estimatedMilkProduction: '10',
    },
    summary: {
      totalDryMatter: '10',
      etherExtractPercent: '20',
      forageDryMatterPercent: '30',
      concentrateDryMatterPercent: '40',
      nonFibrousCarbohydratesPercent: '50',
      rdpTdnRatio: '60',
    },
    evaluations: [
      {
        nutrientName: 'IMS (Ingestão de Matéria Seca)',
        providedValue: '10',
        requiredValue: '15',
        evaluationStatus: 'BELOW' as const,
      },
      {
        nutrientName: 'NDT (Nutrientes Digestíveis Totais)',
        providedValue: '15',
        requiredValue: '15',
        evaluationStatus: 'NORMAL' as const,
      },
      {
        nutrientName: 'PB (Proteína Bruta)',
        providedValue: '15',
        requiredValue: '10',
        evaluationStatus: 'ABOVE' as const,
      },
      {
        nutrientName: 'Ca (Cálcio)',
        providedValue: '15',
        requiredValue: '10',
        evaluationStatus: 'ABOVE' as const,
      },
      {
        nutrientName: 'P (Fósforo)',
        providedValue: '15',
        requiredValue: '17',
        evaluationStatus: 'NORMAL' as const,
      },
    ],
    ingredientGroups: [
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
  }
}
