import { useFormContext } from 'react-hook-form'

import { DatePicker, Form, Textarea } from '@/core/presentation/components/ui'

import { AnimalDiseaseFormSchema } from '../../validations/animal-disease-form-schema'

export function AnimalDiseaseFormInputs() {
  const form = useFormContext<AnimalDiseaseFormSchema>()

  return (
    <>
      <Form.Field
        name="diagnosticDate"
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
        name="diagnostic"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Diagnóstico*</Form.Label>
              <Form.Control>
                <Textarea {...field} isError={!!error?.message} />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />
    </>
  )
}

AnimalDiseaseFormInputs.displayName = 'AnimalDiseaseFormInputs'
