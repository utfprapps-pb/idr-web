import { useState } from 'react'

import { useFormContext } from 'react-hook-form'

import { Combobox, Form, Input } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useAllInputUseActiveIngredientsQuery } from '../../hooks/queries/all-input-use-active-ingredients-query.hook'
import { useAllInputUseProductCategoriesQuery } from '../../hooks/queries/all-input-use-product-categories-query.hook'

import type { InputUseProductFormSchema } from '../../validations/input-use-product-form-schema'

export function InputUseProductFormInputs() {
  const form = useFormContext<InputUseProductFormSchema>()

  const [searchCategory, setSearchCategory] = useState('')
  const [searchActiveIngredient, setSearchActiveIngredient] = useState('')

  const debouncedCategory = useDebounce({ value: searchCategory })
  const debouncedActiveIngredient = useDebounce({
    value: searchActiveIngredient,
  })

  const { allInputUseProductCategories, isLoading: isLoadingCategories } =
    useAllInputUseProductCategoriesQuery({
      filters: {
        name: {
          value: debouncedCategory,
          type: 'LIKE',
        },
      },
    })

  const {
    allInputUseActiveIngredients: allActiveIngredients,
    isLoading: isLoadingActiveIngredients,
  } = useAllInputUseActiveIngredientsQuery({
    filters: {
      name: {
        value: debouncedActiveIngredient,
        type: 'LIKE',
      },
    },
  })

  return (
    <>
      <Form.Field
        name="name"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Nome do Produto*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="Ex: Fertilizante NPK"
                  isError={!!error?.message}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="category"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Categoria*</Form.Label>
              <Form.Control>
                <Combobox
                  search={searchCategory}
                  items={allInputUseProductCategories}
                  loading={isLoadingCategories}
                  selected={field.value}
                  handleSearch={setSearchCategory}
                  handleSelect={field.onChange}
                  isError={!!error}
                  placeholder="Selecione uma categoria"
                  emptyMessage="Nenhuma categoria encontrada"
                  searchPlaceholder="Buscar categoria"
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="activeIngredient"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Princípio Ativo*</Form.Label>
              <Form.Control>
                <Combobox
                  search={searchActiveIngredient}
                  items={allActiveIngredients}
                  loading={isLoadingActiveIngredients}
                  selected={field.value}
                  handleSearch={setSearchActiveIngredient}
                  handleSelect={field.onChange}
                  isError={!!error}
                  placeholder="Selecione um princípio ativo"
                  emptyMessage="Nenhum princípio ativo encontrado"
                  searchPlaceholder="Buscar princípio ativo"
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />
    </>
  )
}

InputUseProductFormInputs.displayName = 'InputUseProductFormInputs'
