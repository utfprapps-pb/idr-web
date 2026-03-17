import { useFormContext } from 'react-hook-form'

import { percentMask } from '@/core/masker'
import { Form, Input, Select } from '@/core/presentation/components/ui'

import type { GeneralCultivationFormSchema } from '../../validations/general-cultivation-form-schema'

export function GeneralCultivationFormInputs() {
  const form = useFormContext<GeneralCultivationFormSchema>()

  return (
    <>
      <Form.Field
        name="name"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Cultivo*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="Milho"
                  isError={!!error?.message}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="type"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Tipo*</Form.Label>
              <Select.Root onValueChange={field.onChange} value={field.value}>
                <Form.Control>
                  <Select.Trigger isError={!!error?.message}>
                    <Select.Value placeholder="Selecione o tipo de cultivo" />
                  </Select.Trigger>
                </Form.Control>
                <Select.Content>
                  <Select.Item value="FORAGE">Volumoso</Select.Item>
                  <Select.Item value="CONCENTRATE">Concentrado</Select.Item>
                  <Select.Item value="MINERAL">Mineral</Select.Item>
                </Select.Content>
              </Select.Root>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="dryMatter"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Matéria Seca (%)*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="10%"
                  isError={!!error?.message}
                  mask={percentMask}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="crudeProtein"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Proteína Bruta (PB % MS)*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="10%"
                  isError={!!error?.message}
                  mask={percentMask}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="totalDigestibleNutrients"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>NDT (Nutrientes Digestíveis Totais % MS)*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="10%"
                  isError={!!error?.message}
                  mask={percentMask}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="calcium"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Cálcio (Ca % MS)*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="10%"
                  isError={!!error?.message}
                  mask={percentMask}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="phosphorus"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Fósforo (P % MS)*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="10%"
                  isError={!!error?.message}
                  mask={percentMask}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="nonFibrousCarbohydrates"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Carboidratos Não Fibrosos (CNF % MS)*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="10%"
                  isError={!!error?.message}
                  mask={percentMask}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="etherExtract"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Extrato Etéreo (EE % MS)*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="10%"
                  isError={!!error?.message}
                  mask={percentMask}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="rumenDegradableProtein"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Proteína Degradável no Rúmen (PDR % MS)*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="10%"
                  isError={!!error?.message}
                  mask={percentMask}
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

GeneralCultivationFormInputs.displayName = 'GeneralCultivationFormInputs'
