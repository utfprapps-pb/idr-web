import { useEffect } from 'react'

import { useFormContext, useWatch } from 'react-hook-form'

import { onlyNumbersAndDecimalMask } from '@/core/masker'

import type { IngredientExtraData } from '../components/ingredient-dialog/ingredient-dialog.hook'
import type { NutritionalBalancingFormSchema } from '../validations/nutritional-balancing-form-schema'
import type { Option } from '@/core/domain/types'

type IngredientGroups =
  NutritionalBalancingFormSchema['nutritionalBalancings'][number]['ingredientGroups']

function calculateIngredientTotals(ingredientGroups: IngredientGroups) {
  const initialTotals = {
    totalDryMatterKg: 0,
    forageDryMatterKg: 0,
    concentrateDryMatterKg: 0,
    totalEtherExtract: 0,
    totalNonFibrousCarbohydrates: 0,
    totalDigestibleNutrients: 0,
    totalCrudeProtein: 0,
    totalCalcium: 0,
    totalPhosphorus: 0,
    totalRumenDegradableProtein: 0,
  }

  return ingredientGroups.reduce((acc, group) => {
    group.ingredients.forEach((item) => {
      const quantity = parseFloat(onlyNumbersAndDecimalMask(item.quantity)) || 0
      const ingredientOption = item.ingredient as Option<
        number,
        IngredientExtraData
      >
      const extra =
        (ingredientOption.extraData as Partial<IngredientExtraData>) || {}

      const dryMatterPercent = (extra.dryMatter || 0) / 100
      const dryMatterKg = quantity * dryMatterPercent

      acc.totalDryMatterKg += dryMatterKg

      if (group.category === 'FORAGE') acc.forageDryMatterKg += dryMatterKg
      if (group.category === 'CONCENTRATE')
        acc.concentrateDryMatterKg += dryMatterKg

      acc.totalEtherExtract += dryMatterKg * ((extra.etherExtract || 0) / 100)
      acc.totalNonFibrousCarbohydrates +=
        dryMatterKg * ((extra.nonFibrousCarbohydrates || 0) / 100)
      acc.totalDigestibleNutrients +=
        dryMatterKg * ((extra.totalDigestibleNutrients || 0) / 100)
      acc.totalCrudeProtein += dryMatterKg * ((extra.crudeProtein || 0) / 100)
      acc.totalCalcium += dryMatterKg * ((extra.calcium || 0) / 100)
      acc.totalPhosphorus += dryMatterKg * ((extra.phosphorus || 0) / 100)
      acc.totalRumenDegradableProtein +=
        dryMatterKg * ((extra.rumenDegradableProtein || 0) / 100)
    })
    return acc
  }, initialTotals)
}

function updateFormSummary(
  form: ReturnType<typeof useFormContext<NutritionalBalancingFormSchema>>,
  animalIndex: number,
  totals: ReturnType<typeof calculateIngredientTotals>
) {
  const summaryPath = `nutritionalBalancings.${animalIndex}.summary` as const
  const {
    totalDryMatterKg,
    totalEtherExtract,
    totalNonFibrousCarbohydrates,
    totalDigestibleNutrients,
    totalRumenDegradableProtein,
  } = totals

  form.setValue(`${summaryPath}.totalDryMatter`, totalDryMatterKg.toFixed(2))

  const safeDivide = (numerator: number, denominator: number) =>
    denominator > 0 ? ((numerator / denominator) * 100).toFixed(2) : '0.00'

  form.setValue(
    `${summaryPath}.etherExtractPercent`,
    safeDivide(totalEtherExtract, totalDryMatterKg)
  )
  form.setValue(
    `${summaryPath}.forageDryMatterPercent`,
    safeDivide(totals.forageDryMatterKg, totalDryMatterKg)
  )
  form.setValue(
    `${summaryPath}.concentrateDryMatterPercent`,
    safeDivide(totals.concentrateDryMatterKg, totalDryMatterKg)
  )
  form.setValue(
    `${summaryPath}.nonFibrousCarbohydratesPercent`,
    safeDivide(totalNonFibrousCarbohydrates, totalDryMatterKg)
  )
  form.setValue(
    `${summaryPath}.rdpTdnRatio`,
    safeDivide(totalRumenDegradableProtein, totalDigestibleNutrients)
  )
}

function updateFormEvaluations(
  form: ReturnType<typeof useFormContext<NutritionalBalancingFormSchema>>,
  animalIndex: number,
  totals: ReturnType<typeof calculateIngredientTotals>
) {
  const evaluations = form.getValues(
    `nutritionalBalancings.${animalIndex}.evaluations`
  )

  if (!evaluations) return

  const getProvidedValue = (nutrientName: string) => {
    if (nutrientName.includes('IMS')) return totals.totalDryMatterKg
    if (nutrientName.includes('NDT')) return totals.totalDigestibleNutrients
    if (nutrientName.includes('PB')) return totals.totalCrudeProtein
    if (nutrientName.includes('Ca')) return totals.totalCalcium
    if (nutrientName.includes('P')) return totals.totalPhosphorus
    return 0
  }

  const updatedEvaluations = evaluations.map((evaluation) => {
    const provided = getProvidedValue(evaluation.nutrientName)
    const required = parseFloat(evaluation.requiredValue) || 0

    let evaluationStatus: 'ABOVE' | 'BELOW' | 'NORMAL' = 'NORMAL'
    if (provided > required * 1.05) evaluationStatus = 'ABOVE'
    else if (provided < required * 0.95) evaluationStatus = 'BELOW'

    return {
      ...evaluation,
      providedValue: provided.toFixed(2),
      evaluationStatus,
    }
  })

  form.setValue(
    `nutritionalBalancings.${animalIndex}.evaluations`,
    updatedEvaluations,
    { shouldDirty: true }
  )
}

export function useNutritionalCalculations(animalIndex: number) {
  const form = useFormContext<NutritionalBalancingFormSchema>()

  const ingredientGroups = useWatch({
    control: form.control,
    name: `nutritionalBalancings.${animalIndex}.ingredientGroups`,
  })

  const animal = useWatch({
    control: form.control,
    name: `nutritionalBalancings.${animalIndex}.animal`,
  })

  useEffect(() => {
    if (!ingredientGroups || !animal) return

    const totals = calculateIngredientTotals(ingredientGroups)

    updateFormSummary(form, animalIndex, totals)
    updateFormEvaluations(form, animalIndex, totals)
  }, [ingredientGroups, animal, animalIndex, form])
}
