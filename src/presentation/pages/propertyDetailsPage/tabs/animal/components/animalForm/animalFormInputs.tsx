import { useState } from 'react'

import { useFormContext } from 'react-hook-form'

import { Combobox, Form, Input } from '@/presentation/components/ui'
import { useAllBreeds, useDebounce } from '@/presentation/hooks'

import type { AnimalFormData } from './validation'

export const AnimalFormInputs: React.FC = () => {
  const form = useFormContext<AnimalFormData>()

  const [searchBreed, setSearchBreed] = useState('')

  const debouncedBreed = useDebounce({ value: searchBreed })

  const { allBreeds, isLoading } = useAllBreeds(debouncedBreed)

  return (
    <>
      <Form.Field
        name="name"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Nome do Animal*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="Mimosa"
                  isError={!!error?.message}
                />
              </Form.Control>
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
