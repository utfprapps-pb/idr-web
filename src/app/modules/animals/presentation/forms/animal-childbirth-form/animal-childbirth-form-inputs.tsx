import { useState } from 'react'

import { useFormContext } from 'react-hook-form'

import { floatMask } from '@/core/masker'
import {
  DatePicker,
  Form,
  Select,
  Input,
  Combobox,
} from '@/core/presentation/components/ui'
import { useAllBreedsQuery, useDebounce } from '@/core/presentation/hooks'

import { AnimalChildBirthFormSchema } from '../../validations/animal-childbirth-form-schema'

export function AnimalChildBirthFormInputs() {
  const form = useFormContext<AnimalChildBirthFormSchema>()

  const [searchBreed, setSearchBreed] = useState('')

  const debouncedBreed = useDebounce({ value: searchBreed })

  const { allBreeds, isLoading } = useAllBreedsQuery(debouncedBreed)

  return (
    <>
      <Form.Field
        name="date"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Data do Parto*</Form.Label>
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
        name="gender"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Sexo do Bezerro*</Form.Label>
              <Select.Root onValueChange={field.onChange} value={field.value}>
                <Form.Control>
                  <Select.Trigger isError={!!error?.message}>
                    <Select.Value placeholder="Selecione o sexo do bezerro" />
                  </Select.Trigger>
                </Form.Control>
                <Select.Content>
                  <Select.Item value="MALE">Macho</Select.Item>
                  <Select.Item value="FEMALE">Fêmea</Select.Item>
                </Select.Content>
              </Select.Root>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="weight"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Peso do Bezerro*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="80,3"
                  isError={!!error?.message}
                  mask={floatMask}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="condition"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Condição do Nascimento*</Form.Label>
              <Select.Root onValueChange={field.onChange} value={field.value}>
                <Form.Control>
                  <Select.Trigger isError={!!error?.message}>
                    <Select.Value placeholder="Selecione a condição de nascimento" />
                  </Select.Trigger>
                </Form.Control>
                <Select.Content>
                  <Select.Item value="ALIVE">Vivo</Select.Item>
                  <Select.Item value="DEAD">Morto</Select.Item>
                </Select.Content>
              </Select.Root>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="breed"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Raça*</Form.Label>
              <Form.Control>
                <Combobox
                  search={searchBreed}
                  items={allBreeds}
                  loading={isLoading}
                  selected={field.value}
                  handleSearch={setSearchBreed}
                  handleSelect={field.onChange}
                  isError={!!error}
                  placeholder="Selecione uma raça"
                  emptyMessage="Nenhuma raça encontrada"
                  searchPlaceholder="Buscar raça"
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

AnimalChildBirthFormInputs.displayName = 'AnimalChildBirthFormInputs'
