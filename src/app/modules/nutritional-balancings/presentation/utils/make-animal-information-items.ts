import { formatNumber } from '@/core/masker'

import type { NutritionalBalancingSchema } from '../validations/nutritional-balancing-form-schema'

export function makeAnimalInformationItems(
  animal: NutritionalBalancingSchema['animal']
) {
  return [
    {
      label: 'Nome do Animal',
      value: animal.name,
    },
    {
      label: 'Tipo de Raça',
      value: animal.breed,
    },
    {
      label: 'ECC',
      value: formatNumber(animal.ecc),
    },
    {
      label: 'Peso Vivo',
      value: formatNumber(animal.weight, {
        suffix: 'kg',
      }),
    },
    {
      label: 'Produção de Leite',
      value: formatNumber(animal.milkProduction, {
        suffix: 'kg',
      }),
    },
    {
      label: 'Produção de Leite Projetada',
      value: formatNumber(animal.estimatedMilkProduction, {
        suffix: 'kg/dia',
      }),
    },
  ]
}
