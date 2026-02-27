import { useEffect, useMemo, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormContext } from 'react-hook-form'

import { useAllGeneralCultivationsQuery } from '@/app/modules/general-cultivations/presentation/hooks/queries/all-general-cultivations-query.hook'
import { useDebounce } from '@/core/presentation/hooks'

import {
  ingredientItemSchema,
  type IngredientItemSchema,
  type NutritionalBalancingFormSchema,
} from '../../validations/nutritional-balancing-form-schema'

import type { Option } from '@/core/domain/types'

export const CATEGORY_LABELS: Record<
  'FORAGE' | 'CONCENTRATE' | 'MINERAL',
  string
> = {
  FORAGE: 'Volumoso',
  CONCENTRATE: 'Concentrado',
  MINERAL: 'Mineral',
}

export type IngredientExtraData = {
  type: 'FORAGE' | 'CONCENTRATE' | 'MINERAL'
  crudeProtein?: number
  totalDigestibleNutrients?: number
  dryMatter?: number
  calcium?: number
  phosphorus?: number
  nonFibrousCarbohydrates?: number
  etherExtract?: number
  rumenDegradableProtein?: number
}

type UseIngredientDialogProps = {
  currentAnimalIndex: number
  onOpenChange: (open: boolean) => void
  onSubmit: (data: IngredientItemSchema) => void
  editMode?: boolean
  initialData?: IngredientItemSchema
}

export function useIngredientDialog({
  currentAnimalIndex,
  onOpenChange,
  onSubmit,
  editMode = false,
  initialData,
}: UseIngredientDialogProps) {
  const parentForm = useFormContext<NutritionalBalancingFormSchema>()
  const [searchIngredient, setSearchIngredient] = useState('')
  const debouncedIngredient = useDebounce({ value: searchIngredient })

  const ingredientGroups = parentForm.watch(
    `nutritionalBalancings.${currentAnimalIndex}.ingredientGroups`
  )

  const selectedIds = useMemo(
    () =>
      ingredientGroups
        ?.flatMap((group) => group.ingredients)
        .map((ingredient) => ingredient.ingredient.value)
        .filter((id): id is number => typeof id === 'number' && id > 0) ?? [],
    [ingredientGroups]
  )

  const { allGeneralCultivations, isLoading } = useAllGeneralCultivationsQuery({
    filters: {
      name: {
        value: debouncedIngredient,
        type: 'LIKE',
      },
      ...(selectedIds.length && !editMode
        ? {
            id: {
              value: selectedIds,
              type: 'NOT_IN',
            },
          }
        : {}),
    },
  })

  const form = useForm<IngredientItemSchema>({
    resolver: zodResolver(ingredientItemSchema),
    defaultValues: initialData || {
      ingredient: { label: '', value: 0 },
      quantity: '',
      type: 'FORAGE',
    },
  })

  useEffect(() => {
    if (editMode && initialData) {
      form.reset(initialData)
    }
  }, [editMode, initialData, form])

  const handleSubmit = (data: IngredientItemSchema) => {
    onSubmit(data)
    form.reset()
    setSearchIngredient('')
    onOpenChange(false)
  }

  const handleClose = () => {
    form.reset()
    setSearchIngredient('')
    onOpenChange(false)
  }

  const handleSelectIngredient = (
    item: Option<number, IngredientExtraData>,
    onChange: (value: Option<number, IngredientExtraData>) => void
  ) => {
    onChange(item)
    if (item.extraData?.type) {
      form.setValue('type', item.extraData.type)
    }
  }

  return {
    form,
    searchIngredient,
    setSearchIngredient,
    allGeneralCultivations,
    isLoading,
    handleSubmit,
    handleClose,
    handleSelectIngredient,
  }
}
