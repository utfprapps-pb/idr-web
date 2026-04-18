import { useState } from 'react'

import { useFormContext } from 'react-hook-form'

import { useAllInputUseProductsQuery } from '@/app/modules/input-uses/presentation/hooks/queries/all-input-use-products-query.hook'
import { floatMask } from '@/core/masker'
import {
  DatePicker,
  Form,
  Select,
  Input,
  Combobox,
} from '@/core/presentation/components/ui'
import { Grouper } from '@/core/presentation/components/utils'
import { useDebounce } from '@/core/presentation/hooks'

import { AnimalMedicationFormSchema } from '../../validations/animal-medication-form-schema'

export function AnimalMedicationFormInputs() {
  const form = useFormContext<AnimalMedicationFormSchema>()

  const [searchProduct, setSearchProduct] = useState('')

  const debouncedProduct = useDebounce({ value: searchProduct })

  const { allInputUseProducts, isLoading: isLoadingAllProducts } =
    useAllInputUseProductsQuery({
      filters: {
        name: {
          value: debouncedProduct,
          type: 'LIKE',
        },
      },
    })

  const selectedProduct = form.watch('product')

  return (
    <>
      <Form.Field
        name="date"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Data da Aplicação*</Form.Label>
              <Form.Control>
                <DatePicker
                  date={field.value}
                  onSelect={field.onChange}
                  isError={!!error?.message}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Grouper>
        <Form.Field
          name="product"
          control={form.control}
          render={({ field, fieldState }) => {
            const { error } = fieldState

            return (
              <Form.Item>
                <Form.Label>Produto*</Form.Label>
                <Form.Control>
                  <Combobox<{ activeIngredient: string }>
                    search={searchProduct}
                    items={allInputUseProducts}
                    loading={isLoadingAllProducts}
                    selected={field.value}
                    handleSearch={setSearchProduct}
                    handleSelect={field.onChange}
                    isError={!!error}
                    placeholder="Selecione um produto"
                    emptyMessage="Nenhum produto encontrado"
                    searchPlaceholder="Buscar produto"
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )
          }}
        />

        <Form.Item>
          <Form.Label>Princípio Ativo</Form.Label>
          <Form.Control>
            <Input
              disabled
              value={selectedProduct?.extraData?.activeIngredient ?? ''}
              placeholder="Princípio ativo do produto"
            />
          </Form.Control>
        </Form.Item>
      </Grouper>

      <Form.Field
        name="appliedDose"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Dose Aplicada*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="10 ml"
                  isError={!!error?.message}
                  mask={(value) => floatMask(value, 'mg/ml')}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="applicationMethod"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Forma de Aplicação*</Form.Label>
              <Select.Root onValueChange={field.onChange} value={field.value}>
                <Form.Control>
                  <Select.Trigger isError={!!error?.message}>
                    <Select.Value placeholder="Selecione o método de aplicação" />
                  </Select.Trigger>
                </Form.Control>
                <Select.Content>
                  <Select.Item value="IM">IM</Select.Item>
                  <Select.Item value="IV">IV</Select.Item>
                  <Select.Item value="SC">SC</Select.Item>
                  <Select.Item value="IntraMammary">Intramamária</Select.Item>
                  <Select.Item value="PourOn">Pour-On</Select.Item>
                </Select.Content>
              </Select.Root>
              <Form.Message />
            </Form.Item>
          )
        }}
      />
    </>
  )
}

AnimalMedicationFormInputs.displayName = 'AnimalMedicationFormInputs'
