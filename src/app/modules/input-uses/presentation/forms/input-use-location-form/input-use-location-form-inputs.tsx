import { useFormContext } from 'react-hook-form'

import { Form, Input } from '@/core/presentation/components/ui'

import type { InputUseLocationFormSchema } from '../../validations/input-use-location-form-schema'

export function InputUseLocationFormInputs() {
  const form = useFormContext<InputUseLocationFormSchema>()

  return (
    <Form.Field
      control={form.control}
      name="description"
      render={({ field }) => (
        <Form.Item>
          <Form.Label>Descrição</Form.Label>
          <Form.Control>
            <Input {...field} placeholder="Ex: Galpão de Insumos" />
          </Form.Control>
          <Form.Message />
        </Form.Item>
      )}
    />
  )
}

InputUseLocationFormInputs.displayName = 'InputUseLocationFormInputs'
