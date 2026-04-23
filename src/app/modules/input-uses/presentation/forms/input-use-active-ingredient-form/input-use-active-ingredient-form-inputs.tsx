import { useFormContext } from 'react-hook-form'

import { Form, Input } from '@/core/presentation/components/ui'

import type { InputUseActiveIngredientFormSchema } from '../../validations/input-use-active-ingredient-form-schema'

export function InputUseActiveIngredientFormInputs() {
  const form = useFormContext<InputUseActiveIngredientFormSchema>()

  return (
    <Form.Field
      control={form.control}
      name="name"
      render={({ field }) => (
        <Form.Item>
          <Form.Label>Nome*</Form.Label>
          <Form.Control>
            <Input {...field} placeholder="Ex: Glifosato" />
          </Form.Control>
          <Form.Message />
        </Form.Item>
      )}
    />
  )
}

InputUseActiveIngredientFormInputs.displayName =
  'InputUseActiveIngredientFormInputs'
