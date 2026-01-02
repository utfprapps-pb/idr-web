import { useState } from 'react'

import { useFormContext } from 'react-hook-form'

import { DatePicker, Form, Combobox } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useAnimalInseminationContext } from '../../hooks/animal-insemination-context.hook'
import { useAllAnimalsWithFilterQuery } from '../../hooks/queries/all-animals-with-filter-query.hook'
import { AnimalInseminationFormSchema } from '../../validations/animal-insemination-form-schema'

export function AnimalInseminationFormInputs() {
  const form = useFormContext<AnimalInseminationFormSchema>()
  const { propertyId } = useAnimalInseminationContext()

  const [searchAnimal, setSearchAnimal] = useState('')

  const debouncedAnimal = useDebounce({ value: searchAnimal })

  const { allAnimals, isLoading } = useAllAnimalsWithFilterQuery({
    propertyId,
    filters: {
      name: {
        value: debouncedAnimal,
        type: 'LIKE',
      },
    },
  })

  return (
    <>
      <Form.Field
        name="date"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Data da Inseminação Artificial*</Form.Label>
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
        name="sire"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Animal Reprodutor*</Form.Label>
              <Form.Control>
                <Combobox
                  search={searchAnimal}
                  items={allAnimals}
                  loading={isLoading}
                  selected={field.value}
                  handleSearch={setSearchAnimal}
                  handleSelect={field.onChange}
                  isError={!!error}
                  placeholder="Selecione o animal reprodutor"
                  emptyMessage="Nenhum animal encontrado"
                  searchPlaceholder="Buscar animal reprodutor"
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

AnimalInseminationFormInputs.displayName = 'AnimalInseminationFormInputs'
