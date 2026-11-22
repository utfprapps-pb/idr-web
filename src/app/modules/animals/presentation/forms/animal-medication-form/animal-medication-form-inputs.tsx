import { useMemo, useState } from 'react'

import { useFormContext } from 'react-hook-form'

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

import { useAllProductsQuery } from '../../hooks/queries/all-products-query.hook'
import {
  type AnimalMedicationFormSchema,
  PRODUCT_TEXT_MAX_LENGTH,
} from '../../validations/animal-medication-form-schema'

import type { AnimalMedicationProductOption } from '../../../domain/models/animal-medications-model'

const NOT_REGISTERED_PRODUCT: AnimalMedicationProductOption = {
  label: 'Produto não cadastrado',
  value: '',
}

export function AnimalMedicationFormInputs() {
  const form = useFormContext<AnimalMedicationFormSchema>()

  const [searchProduct, setSearchProduct] = useState('')

  const debouncedProduct = useDebounce({ value: searchProduct })

  const { allProducts, isLoading: isLoadingAllProducts } = useAllProductsQuery({
    filters: {
      name: {
        value: debouncedProduct,
        type: 'LIKE',
      },
    },
  })

  const productOptions = useMemo(
    () => [NOT_REGISTERED_PRODUCT, ...allProducts],
    [allProducts]
  )

  const isCatalogProduct = !!form.watch('product')?.value

  /** Do catálogo, nome e princípio ativo vêm do produto; senão, são digitados. */
  const handleSelectProduct = (product: AnimalMedicationProductOption) => {
    const options = {
      shouldDirty: true,
      shouldValidate: form.formState.isSubmitted,
    }

    form.setValue('product', product, options)

    // Reescolher "não cadastrado" mantém o que já foi digitado.
    if (!product.value && !isCatalogProduct) return

    form.setValue('productName', product.value ? product.label : '', options)
    form.setValue(
      'activePrinciple',
      product.extraData?.activePrinciple ?? '',
      options
    )
  }

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

      <Form.Field
        name="product"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Produto*</Form.Label>
              <Form.Control>
                <Combobox<string, { activePrinciple: string }>
                  search={searchProduct}
                  items={productOptions}
                  loading={isLoadingAllProducts}
                  selected={
                    field.value.value ? field.value : NOT_REGISTERED_PRODUCT
                  }
                  handleSearch={setSearchProduct}
                  handleSelect={handleSelectProduct}
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

      <Grouper>
        <Form.Field
          name="productName"
          control={form.control}
          render={({ field, fieldState }) => {
            const { error } = fieldState

            return (
              <Form.Item>
                <Form.Label>
                  Nome do Produto{isCatalogProduct ? '' : '*'}
                </Form.Label>
                <Form.Control>
                  <Input
                    {...field}
                    disabled={isCatalogProduct}
                    maxLength={PRODUCT_TEXT_MAX_LENGTH}
                    placeholder="Nome do produto aplicado"
                    isError={!!error?.message}
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )
          }}
        />

        <Form.Field
          name="activePrinciple"
          control={form.control}
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Princípio Ativo</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  disabled={isCatalogProduct}
                  maxLength={PRODUCT_TEXT_MAX_LENGTH}
                  placeholder="Princípio ativo do produto"
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
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
