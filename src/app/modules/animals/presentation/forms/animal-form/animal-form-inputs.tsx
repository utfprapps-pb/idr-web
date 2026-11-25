import { useMemo, useState } from 'react'

import { useFormContext } from 'react-hook-form'

import { floatMask } from '@/core/masker'
import {
  Combobox,
  DatePicker,
  Form,
  Input,
  Select,
} from '@/core/presentation/components/ui'
import {
  useAllAnimalSizesQuery,
  useAllBreedsQuery,
  useDebounce,
} from '@/core/presentation/hooks'

import {
  ANIMAL_BORN_CONDITIONS,
  ANIMAL_GENDERS,
} from '../../../domain/models/animal-options'
import { useAnimalContext } from '../../hooks/animal-context.hook'
import { useAllAnimalsWithFilterQuery } from '../../hooks/queries/all-animals-with-filter-query.hook'

import {
  NOT_INFORMED,
  fromOptionalSelectValue,
  optionalCatalogOptions,
  optionalSelectOptions,
} from './optional-select-options'

import type { AnimalFormSchema } from '../../validations/animal-form-schema'

const NO_MOTHER = { label: 'Nenhuma', value: '' }

type OptionalSelectFieldProps = {
  name: 'gender' | 'bornCondition'
  label: string
  placeholder: string
  values: readonly string[]
}

function OptionalSelectField({
  name,
  label,
  placeholder,
  values,
}: Readonly<OptionalSelectFieldProps>) {
  const form = useFormContext<AnimalFormSchema>()

  return (
    <Form.Field
      name={name}
      control={form.control}
      render={({ field }) => (
        <Form.Item>
          <Form.Label>{label}</Form.Label>
          <Select.Root
            onValueChange={(value) =>
              field.onChange(fromOptionalSelectValue(value))
            }
            value={field.value ?? ''}
          >
            <Form.Control>
              <Select.Trigger>
                <Select.Value placeholder={placeholder} />
              </Select.Trigger>
            </Form.Control>
            <Select.Content>
              {optionalSelectOptions(field.value ?? '', values).map(
                (option) => (
                  <Select.Item key={option.value} value={option.value}>
                    {option.label}
                  </Select.Item>
                )
              )}
            </Select.Content>
          </Select.Root>
          <Form.Message />
        </Form.Item>
      )}
    />
  )
}

const NO_SIZE = { label: '', value: '' }

/** Porte (tipo de raça) escolhido do catálogo, independente da raça. */
function AnimalSizeSelectField() {
  const form = useFormContext<AnimalFormSchema>()

  const { allAnimalSizes } = useAllAnimalSizesQuery()

  return (
    <Form.Field
      name="size"
      control={form.control}
      render={({ field }) => {
        const options = optionalCatalogOptions(field.value, allAnimalSizes)

        return (
          <Form.Item>
            <Form.Label>Porte (tipo de raça)</Form.Label>
            <Select.Root
              onValueChange={(value) =>
                field.onChange(
                  value === NOT_INFORMED
                    ? NO_SIZE
                    : (options.find((option) => option.value === value) ??
                        NO_SIZE)
                )
              }
              value={field.value.value}
            >
              <Form.Control>
                <Select.Trigger>
                  <Select.Value placeholder="Selecione o porte" />
                </Select.Trigger>
              </Form.Control>
              <Select.Content>
                {options.map((option) => (
                  <Select.Item key={option.value} value={option.value}>
                    {option.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
            <Form.Message />
          </Form.Item>
        )
      }}
    />
  )
}

type AnimalFormInputsProps = {
  /** Na edição, o próprio animal não pode ser escolhido como mãe. */
  animalId?: string
}

export function AnimalFormInputs({
  animalId,
}: Readonly<AnimalFormInputsProps>) {
  const form = useFormContext<AnimalFormSchema>()

  const { propertyId } = useAnimalContext()

  const [searchBreed, setSearchBreed] = useState('')

  const debouncedBreed = useDebounce({ value: searchBreed })

  const { allBreeds, isLoading } = useAllBreedsQuery({
    filters: {
      name: {
        value: debouncedBreed,
        type: 'LIKE',
      },
    },
  })

  const [searchMother, setSearchMother] = useState('')

  const debouncedMother = useDebounce({ value: searchMother })

  const { allAnimals, isLoading: isLoadingAnimals } =
    useAllAnimalsWithFilterQuery({
      propertyId,
      filters: { name: { value: debouncedMother, type: 'LIKE' } },
    })

  const motherOptions = useMemo(
    () => [
      NO_MOTHER,
      ...allAnimals
        .filter((animal) => animal.value !== animalId)
        .map(({ label, value }) => ({ label, value })),
    ],
    [allAnimals, animalId]
  )

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

      <AnimalSizeSelectField />

      <OptionalSelectField
        name="gender"
        label="Sexo"
        placeholder="Selecione o sexo"
        values={ANIMAL_GENDERS}
      />

      <Form.Field
        name="mother"
        control={form.control}
        render={({ field }) => (
          <Form.Item>
            <Form.Label>Mãe</Form.Label>
            <Form.Control>
              <Combobox
                search={searchMother}
                items={motherOptions}
                loading={isLoadingAnimals}
                selected={field.value.value ? field.value : NO_MOTHER}
                handleSearch={setSearchMother}
                handleSelect={field.onChange}
                placeholder="Selecione a mãe (opcional)"
                emptyMessage="Nenhum animal encontrado"
                searchPlaceholder="Buscar animal"
              />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />

      <Form.Field
        name="bornDate"
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <Form.Item>
            <Form.Label>Data de Nascimento</Form.Label>
            <Form.Control>
              <DatePicker
                date={field.value ?? undefined}
                onSelect={(date) => field.onChange(date ?? null)}
                isError={!!error?.message}
              />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />

      <Form.Field
        name="bornWeight"
        control={form.control}
        render={({ field }) => (
          <Form.Item>
            <Form.Label>Peso ao Nascer</Form.Label>
            <Form.Control>
              <Input
                {...field}
                placeholder="35,0 kg"
                mask={(value) => floatMask(value, 'kg')}
              />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />

      <OptionalSelectField
        name="bornCondition"
        label="Condição ao Nascer"
        placeholder="Selecione a condição ao nascer"
        values={ANIMAL_BORN_CONDITIONS}
      />
    </>
  )
}
