import { useFormContext } from 'react-hook-form'

import { Form, Input } from '@/core/presentation/components/ui'

import type { ProductCategoryFormSchema } from '../../validations/product-category-form-schema'

export function ProductCategoryFormInputs() {
  const form = useFormContext<ProductCategoryFormSchema>()

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

ProductCategoryFormInputs.displayName = 'ProductCategoryFormInputs'
