import { floatMask } from '@/core/masker'

import type { NutritionalBalancingFormSchema } from '../validations/nutritional-balancing-form-schema'
import type { UseFormReturn } from 'react-hook-form'

export function makeAnimalInformationItems(
  form: UseFormReturn<NutritionalBalancingFormSchema>,
  currentNutritionalBalancingIndex: number
) {
  return [
    {
      label: 'Nome do Animal',
      value: form.getValues(
        `nutritionalBalancings.${currentNutritionalBalancingIndex}.animal.name`
      ),
    },
    {
      label: 'Tipo de Raça',
      value: form.getValues(
        `nutritionalBalancings.${currentNutritionalBalancingIndex}.animal.breed`
      ),
    },
    {
      label: 'ECC',
      value: floatMask(
        form.getValues(
          `nutritionalBalancings.${currentNutritionalBalancingIndex}.animal.ecc`
        )
      ),
    },
    {
      label: 'Peso Vivo',
      value: floatMask(
        form.getValues(
          `nutritionalBalancings.${currentNutritionalBalancingIndex}.animal.weight`
        ),
        'kg'
      ),
    },
    {
      label: 'Produção de Leite',
      value: floatMask(
        form.getValues(
          `nutritionalBalancings.${currentNutritionalBalancingIndex}.animal.milkProduction`
        ),
        'kg'
      ),
    },
    {
      label: 'Produção de Leite Projetada',
      value: floatMask(
        form.getValues(
          `nutritionalBalancings.${currentNutritionalBalancingIndex}.animal.estimatedMilkProduction`
        ),
        'kg/dia'
      ),
    },
  ]
}
