import { useState } from 'react'

import { useFormContext } from 'react-hook-form'

import { moneyMask, onlyNumbersMask } from '@/masker'
import {
  Combobox,
  DatePicker,
  Form,
  Input,
  Select,
} from '@/presentation/components/ui'
import { useDebounce } from '@/presentation/hooks'
import { useAllVegetables } from '@/presentation/hooks/useAllVegetables'

import { type ForageFormData } from './validation'

export const ForageFormInputs: React.FC = () => {
  const [searchCultivation, setSearchCultivation] = useState('')

  const debouncedCultivation = useDebounce({ value: searchCultivation })

  const form = useFormContext<ForageFormData>()

  const { allVegetables, isLoading } = useAllVegetables(debouncedCultivation)

  return (
    <>
      <Form.Field
        name="cultivation"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Cultivo*</Form.Label>
              <Form.Control>
                <Combobox
                  search={searchCultivation}
                  items={allVegetables}
                  loading={isLoading}
                  selected={field.value}
                  handleSearch={(value) => setSearchCultivation(value)}
                  handleSelect={field.onChange}
                  isError={!!error}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="area"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Área (ha)*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="80"
                  isError={!!error?.message}
                  mask={onlyNumbersMask}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="averageCost"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Custo médio de formação*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="R$ 9,90"
                  isError={!!error?.message}
                  mask={moneyMask}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="usefulLife"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Vida útil (anos)*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="8"
                  isError={!!error?.message}
                  mask={onlyNumbersMask}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="formation"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Data de formação*</Form.Label>
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
        name="ownershipType"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Tipo*</Form.Label>
              <Select.Root onValueChange={field.onChange} value={field.value}>
                <Form.Control>
                  <Select.Trigger isError={!!error?.message}>
                    <Select.Value placeholder="Selecione o tipo da terra" />
                  </Select.Trigger>
                </Form.Control>
                <Select.Content>
                  <Select.Item value="OWNED_LAND">Terra Própria</Select.Item>
                  <Select.Item value="LEASED_LAND">Terra Arrendada</Select.Item>
                </Select.Content>
              </Select.Root>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="growthCycle"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Ciclo de crescimento*</Form.Label>
              <Select.Root onValueChange={field.onChange} value={field.value}>
                <Form.Control>
                  <Select.Trigger isError={!!error?.message}>
                    <Select.Value placeholder="Selecione o ciclo de crescimento" />
                  </Select.Trigger>
                </Form.Control>
                <Select.Content>
                  <Select.Item value="ANNUAL">Anual</Select.Item>
                  <Select.Item value="PERENNIAL">Perene</Select.Item>
                </Select.Content>
              </Select.Root>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="observation"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Observação</Form.Label>
              <Form.Control>
                <Input {...field} isError={!!error?.message} />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />
    </>
  )
}
