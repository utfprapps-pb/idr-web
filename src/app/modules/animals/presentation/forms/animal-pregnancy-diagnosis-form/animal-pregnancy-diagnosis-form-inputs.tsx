import { useFormContext } from 'react-hook-form'

import { DatePicker, Form } from '@/core/presentation/components/ui'

import type { AnimalPregnancyDiagnosisFormSchema } from '../../validations/animal-pregnancy-diagnosis-form-schema'

export function AnimalPregnancyDiagnosisFormInputs() {
  const form = useFormContext<AnimalPregnancyDiagnosisFormSchema>()

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
        name="lastInseminationDate"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Data da Última Inseminação*</Form.Label>
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
    </>
  )
}

AnimalPregnancyDiagnosisFormInputs.displayName =
  'AnimalPregnancyDiagnosisFormInputs'
