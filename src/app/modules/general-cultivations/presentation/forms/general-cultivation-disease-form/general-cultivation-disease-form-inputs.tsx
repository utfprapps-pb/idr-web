import { useFormContext } from 'react-hook-form'

import { Form, Input } from '@/core/presentation/components/ui'

import type { GeneralCultivationDiseaseFormSchema } from '../../validations/general-cultivation-disease-form-schema'

export function GeneralCultivationDiseaseFormInputs() {
  const form = useFormContext<GeneralCultivationDiseaseFormSchema>()

  return (
    <Form.Field
      name="name"
      control={form.control}
      render={({ field, fieldState }) => {
        const { error } = fieldState

        return (
          <Form.Item>
            <Form.Label>Nome*</Form.Label>
            <Form.Control>
              <Input
                {...field}
                placeholder="Mancha foliar"
                isError={!!error?.message}
              />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )
      }}
    />
  )
}

GeneralCultivationDiseaseFormInputs.displayName =
  'GeneralCultivationDiseaseFormInputs'
