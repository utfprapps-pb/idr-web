import { useFormContext } from 'react-hook-form'

import { DatePicker, Form, Textarea } from '@/core/presentation/components/ui'

import { AnimalDeathFormSchema } from '../../validations/animal-death-form-schema'

export function AnimalDeathFormInputs() {
  const form = useFormContext<AnimalDeathFormSchema>()

  return (
    <>
      <Form.Field
        name="date"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Data do Óbito*</Form.Label>
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
              <Form.Label>Causa do Óbito*</Form.Label>
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

AnimalDeathFormInputs.displayName = 'AnimalDeathFormInputs'
