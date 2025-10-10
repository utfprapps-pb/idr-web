import { useFormContext } from 'react-hook-form'

import { DatePicker, Form, Select } from '@/core/presentation/components/ui'

import { AnimalMastitisFormSchema } from '../../validations/animal-mastitis-form-schema'

function ResultsFormItem({
  label,
  value,
  onChange,
  errorMessage,
}: Readonly<{
  label: string
  value: string
  onChange: (value: string) => void
  errorMessage?: string
}>) {
  return (
    <Form.Item>
      <Form.Label>{label}</Form.Label>
      <Select.Root onValueChange={onChange} value={value}>
        <Form.Control>
          <Select.Trigger isError={!!errorMessage}>
            <Select.Value placeholder="Selecione o resultado" />
          </Select.Trigger>
        </Form.Control>
        <Select.Content>
          <Select.Item value="PLUS-ONE">+</Select.Item>
          <Select.Item value="PLUS-TWO">++</Select.Item>
          <Select.Item value="PLUS-THREE">+++</Select.Item>
          <Select.Item value="ABSENT">Ausente</Select.Item>
        </Select.Content>
      </Select.Root>
      <Form.Message />
    </Form.Item>
  )
}

export function AnimalMastitisFormInputs() {
  const form = useFormContext<AnimalMastitisFormSchema>()

  return (
    <>
      <Form.Field
        name="date"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Data do Diagnóstico*</Form.Label>
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
        name="type"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Tipo de Mastite*</Form.Label>
              <Select.Root onValueChange={field.onChange} value={field.value}>
                <Form.Control>
                  <Select.Trigger isError={!!error?.message}>
                    <Select.Value placeholder="Selecione o tipo de mastite" />
                  </Select.Trigger>
                </Form.Control>
                <Select.Content>
                  <Select.Item value="CLINICAL">Clínica</Select.Item>
                  <Select.Item value="SUBCLINICAL">Subclínica</Select.Item>
                </Select.Content>
              </Select.Root>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="ad"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <ResultsFormItem
              label="AD*"
              value={field.value}
              onChange={field.onChange}
              errorMessage={error?.message}
            />
          )
        }}
      />

      <Form.Field
        name="ae"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <ResultsFormItem
              label="AE*"
              value={field.value}
              onChange={field.onChange}
              errorMessage={error?.message}
            />
          )
        }}
      />

      <Form.Field
        name="pd"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <ResultsFormItem
              label="PD*"
              value={field.value}
              onChange={field.onChange}
              errorMessage={error?.message}
            />
          )
        }}
      />

      <Form.Field
        name="pe"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <ResultsFormItem
              label="PE*"
              value={field.value}
              onChange={field.onChange}
              errorMessage={error?.message}
            />
          )
        }}
      />
    </>
  )
}

AnimalMastitisFormInputs.displayName = 'AnimalMastitisFormInputs'
