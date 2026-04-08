import { useFormContext } from 'react-hook-form'

import { Form, Input } from '@/core/presentation/components/ui'

import type { InputUseProductCategoryFormSchema } from '../../validations/input-use-product-category-form-schema'

export function InputUseProductCategoryFormInputs() {
  const form = useFormContext<InputUseProductCategoryFormSchema>()

  return (
    <Form.Field
      control={form.control}
      name="name"
      render={({ field }) => (
        <Form.Item>
          <Form.Label>Nome</Form.Label>
          <Form.Control>
            <Input {...field} placeholder="Ex: Fertilizantes" />
          </Form.Control>
          <Form.Message />
        </Form.Item>
      )}
    />
  )
}

InputUseProductCategoryFormInputs.displayName =
  'InputUseProductCategoryFormInputs'
