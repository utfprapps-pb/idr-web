import { useFormContext } from 'react-hook-form'

import { Form, Input, Select } from '@/core/presentation/components/ui'

import type { GeneralCultivationFormSchema } from '../../validations/general-cultivation-form-schema'

export function GeneralCultivationFormInputs() {
  const form = useFormContext<GeneralCultivationFormSchema>()

  return (
    <>
      <Form.Field
        name="name"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Cultivo*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="Milho"
                  isError={!!error?.message}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="type"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Tipo*</Form.Label>
              <Select.Root onValueChange={field.onChange} value={field.value}>
                <Form.Control>
                  <Select.Trigger isError={!!error?.message}>
                    <Select.Value placeholder="Selecione o tipo de cultivo" />
                  </Select.Trigger>
                </Form.Control>
                <Select.Content>
                  <Select.Item value="FORAGE">Volumoso</Select.Item>
                  <Select.Item value="CONCENTRATE">Concentrado</Select.Item>
                  <Select.Item value="MINERAL">Mineral</Select.Item>
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

GeneralCultivationFormInputs.displayName = 'GeneralCultivationFormInputs'
