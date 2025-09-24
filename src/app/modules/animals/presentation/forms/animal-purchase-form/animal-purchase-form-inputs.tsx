import { useFormContext } from 'react-hook-form'

import { floatMask, moneyMask } from '@/core/masker'
import { DatePicker, Form, Input } from '@/core/presentation/components/ui'

import { AnimalPurchaseFormSchema } from '../../validations/animal-purchase-form-schema'

export function AnimalPurchaseFormInputs() {
  const form = useFormContext<AnimalPurchaseFormSchema>()

  return (
    <>
      <Form.Field
        name="date"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Data da Compra*</Form.Label>
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
        name="birthDate"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Data do Nascimento*</Form.Label>
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
        name="weight"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Peso*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="80,3"
                  isError={!!error?.message}
                  mask={floatMask}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="price"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Valor Pago*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="R$ 0,00"
                  isError={!!error?.message}
                  mask={moneyMask}
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

AnimalPurchaseFormInputs.displayName = 'AnimalPurchaseFormInputs'
