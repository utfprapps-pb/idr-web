import { useState } from 'react'

import { useFormContext } from 'react-hook-form'

import {
  Combobox,
  Form,
  Input,
  Select,
} from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'
import { useSearchRegionsQuery } from '@/core/presentation/hooks/queries/search-regions-query.hook'

import { useCityContext } from '../../hooks/city-context.hook'
import { STATES } from '../../validations/city-form-schema'

import type { CityFormSchema } from '../../validations/city-form-schema'

type Props = {
  disableState?: boolean
}

export function CityFormInputs({ disableState = false }: Props) {
  const form = useFormContext<CityFormSchema>()
  const { citySelected } = useCityContext()

  const [searchRegion, setSearchRegion] = useState('')
  const debouncedRegion = useDebounce({ value: searchRegion })

  const { regions, isLoading: isLoadingRegions } = useSearchRegionsQuery({
    terms: debouncedRegion,
  })

  return (
    <>
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
                  placeholder="Nome da cidade"
                  isError={!!error?.message}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="state"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Estado{disableState ? '' : '*'}</Form.Label>
              <Select.Root
                onValueChange={field.onChange}
                value={field.value}
                disabled={disableState}
              >
                <Form.Control>
                  <Select.Trigger isError={!!error?.message}>
                    <Select.Value placeholder="Selecione o estado" />
                  </Select.Trigger>
                </Form.Control>
                <Select.Content>
                  {STATES.map((state) => (
                    <Select.Item key={state.value} value={state.value}>
                      {state.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="regionId"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          const selectedRegion =
            regions.find((r) => r.value === field.value) ??
            (field.value && citySelected?.regionId === field.value
              ? { label: citySelected.regionName, value: citySelected.regionId }
              : { label: '', value: '' })

          return (
            <Form.Item>
              <Form.Label>Região*</Form.Label>
              <Form.Control>
                <Combobox
                  search={searchRegion}
                  items={regions}
                  loading={isLoadingRegions}
                  selected={selectedRegion}
                  handleSearch={setSearchRegion}
                  handleSelect={(item) => field.onChange(item.value)}
                  isError={!!error}
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

CityFormInputs.displayName = 'CityFormInputs'
