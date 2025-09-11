import { useFormContext } from 'react-hook-form'

import { floatMask } from '@/core/masker'
import { Form, Input } from '@/core/presentation/components/ui'

import type { PropertyFormSchema } from '../../../validations/property-form-schema'

export function PropertyFormTotalAreaTab() {
  const form = useFormContext<PropertyFormSchema>()

  return (
    <>
      <Form.Field
        name="totalArea.dairyCattleFarming"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Área destinada a Bovinocultura Leiteira</Form.Label>
              <Form.Control>
                <Input {...field} isError={!!error?.message} mask={floatMask} />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />
      <Form.Field
        name="totalArea.perennialPasture"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Área de pasto perene</Form.Label>
              <Form.Control>
                <Input {...field} isError={!!error?.message} mask={floatMask} />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />
      <Form.Field
        name="totalArea.summerPlowing"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Área de lavoura de verão</Form.Label>
              <Form.Control>
                <Input {...field} isError={!!error?.message} mask={floatMask} />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />
      <Form.Field
        name="totalArea.winterPlowing"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Área de lavoura de inverno</Form.Label>
              <Form.Control>
                <Input {...field} isError={!!error?.message} mask={floatMask} />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />
    </>
  )
}

PropertyFormTotalAreaTab.displayName = 'PropertyFormTotalAreaTab'
