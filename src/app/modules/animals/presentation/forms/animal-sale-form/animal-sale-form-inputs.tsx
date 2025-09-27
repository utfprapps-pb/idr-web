import { useFormContext } from 'react-hook-form'

import { floatMask, moneyMask } from '@/core/masker'
import {
  DatePicker,
  Form,
  Input,
  Select,
} from '@/core/presentation/components/ui'

import { AnimalSaleFormSchema } from '../../validations/animal-sale-form-schema'

export function AnimalSaleFormInputs() {
  const form = useFormContext<AnimalSaleFormSchema>()

  return (
    <>
      <Form.Field
        name="date"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Data da Venda*</Form.Label>
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
        name="reason"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Motivo da Venda*</Form.Label>
              <Select.Root onValueChange={field.onChange} value={field.value}>
                <Form.Control>
                  <Select.Trigger isError={!!error?.message}>
                    <Select.Value placeholder="Selecione o motivo da venda" />
                  </Select.Trigger>
                </Form.Control>
                <Select.Content>
                  <Select.Item value="VOLUNTARY">Voluntário</Select.Item>
                  <Select.Item value="DISCARD">Descarte</Select.Item>
                  <Select.Item value="EMERGENCY">Emergência</Select.Item>
                </Select.Content>
              </Select.Root>
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
                  placeholder="80,3 kg"
                  isError={!!error?.message}
                  mask={(value) => floatMask(value, 'kg')}
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

      <Form.Field
        name="destination"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Destino*</Form.Label>
              <Select.Root onValueChange={field.onChange} value={field.value}>
                <Form.Control>
                  <Select.Trigger isError={!!error?.message}>
                    <Select.Value placeholder="Selecione o destino" />
                  </Select.Trigger>
                </Form.Control>
                <Select.Content>
                  <Select.Item value="SLAUGHTER">Abate</Select.Item>
                  <Select.Item value="PRODUCTION">Produção</Select.Item>
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

AnimalSaleFormInputs.displayName = 'AnimalSaleFormInputs'
