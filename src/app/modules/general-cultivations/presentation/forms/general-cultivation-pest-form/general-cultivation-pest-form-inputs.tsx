import { useFormContext } from 'react-hook-form'

import { Form, Input } from '@/core/presentation/components/ui'

export function GeneralCultivationPestFormInputs() {
  const form = useFormContext()

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Form.Field
        name="name"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item className="col-span-1 md:col-span-2">
              <Form.Label>Nome*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="Nome da Praga de Cultivo Geral"
                  isError={!!error?.message}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />
    </div>
  )
}
