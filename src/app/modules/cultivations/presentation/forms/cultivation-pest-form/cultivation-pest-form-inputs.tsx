import { useState } from 'react'

import { useFormContext } from 'react-hook-form'

import { useAllGeneralCultivationPestsQuery } from '@/app/modules/general-cultivations/presentation/hooks/queries/all-general-cultivation-pests-query.hook'
import { useAllGeneralCultivationsQuery } from '@/app/modules/general-cultivations/presentation/hooks/queries/all-general-cultivations-query.hook'
import { Combobox, Form, Select } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { CultivationPestFormSchema } from '../../validations/cultivation-pest-form-schema'

export function CultivationPestFormInputs() {
  const form = useFormContext<CultivationPestFormSchema>()

  const [searchCultivation, setSearchCultivation] = useState('')
  const debouncedCultivation = useDebounce({ value: searchCultivation })
  const { allGeneralCultivations, isLoading: isLoadingAllCultivations } =
    useAllGeneralCultivationsQuery({
      filters: {
        name: {
          value: debouncedCultivation,
          type: 'LIKE',
        },
      },
    })

  const [searchCultivationPest, setSearchCultivationPest] = useState('')
  const debouncedCultivationPest = useDebounce({
    value: searchCultivationPest,
  })
  const {
    allGeneralCultivationPests,
    isLoading: isLoadingAllCultivationPests,
  } = useAllGeneralCultivationPestsQuery({
    filters: {
      name: {
        value: debouncedCultivationPest,
        type: 'LIKE',
      },
    },
  })

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
                  items={allGeneralCultivations}
                  loading={isLoadingAllCultivations}
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
        name="pest"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Identificação da Praga*</Form.Label>
              <Form.Control>
                <Combobox
                  search={searchCultivationPest}
                  items={allGeneralCultivationPests}
                  loading={isLoadingAllCultivationPests}
                  selected={field.value}
                  handleSearch={(value) => setSearchCultivationPest(value)}
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
        name="infestationType"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Tipo de Infestação*</Form.Label>
              <Select.Root onValueChange={field.onChange} value={field.value}>
                <Form.Control>
                  <Select.Trigger isError={!!error?.message}>
                    <Select.Value placeholder="Selecione o tipo de infestação" />
                  </Select.Trigger>
                </Form.Control>
                <Select.Content>
                  <Select.Item value="LOW">Branda</Select.Item>
                  <Select.Item value="MEDIUM">Média</Select.Item>
                  <Select.Item value="HIGH">Alta</Select.Item>
                </Select.Content>
              </Select.Root>
              <Form.Message />
            </Form.Item>
          )
        }}
      />
    </>
  )
}

CultivationPestFormInputs.displayName = 'CultivationPestFormInputs'
