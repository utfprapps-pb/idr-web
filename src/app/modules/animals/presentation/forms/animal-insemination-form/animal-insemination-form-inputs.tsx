import { useFormContext } from 'react-hook-form'

import { DatePicker, Form, Input } from '@/core/presentation/components/ui'

import { AnimalInseminationFormSchema } from '../../validations/animal-insemination-form-schema'

export function AnimalInseminationFormInputs() {
  const form = useFormContext<AnimalInseminationFormSchema>()

  return (
    <>
      <Form.Field
        name="date"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Data da Inseminação Artificial*</Form.Label>
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
        name="sire"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Touro*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="Nome ou identificação do touro"
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

AnimalInseminationFormInputs.displayName = 'AnimalInseminationFormInputs'
