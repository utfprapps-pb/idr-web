import { useState } from 'react'

import { useFormContext } from 'react-hook-form'

import { useAllGeneralCultivationDiseasesQuery } from '@/app/modules/general-cultivations/presentation/hooks/queries/all-general-cultivation-diseases-query.hook'
import { useAllGeneralCultivationsQuery } from '@/app/modules/general-cultivations/presentation/hooks/queries/all-general-cultivations-query.hook'
import { Combobox, Form, Select } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { CultivationDiseaseFormSchema } from '../../validations/cultivation-disease-form-schema'

export function CultivationDiseaseFormInputs() {
  const form = useFormContext<CultivationDiseaseFormSchema>()

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

  const [searchCultivationDisease, setSearchCultivationDisease] = useState('')
  const debouncedCultivationDisease = useDebounce({
    value: searchCultivationDisease,
  })
  const {
    allGeneralCultivationDiseases,
    isLoading: isLoadingAllCultivationDiseases,
  } = useAllGeneralCultivationDiseasesQuery({
    filters: {
      name: {
        value: debouncedCultivationDisease,
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
        name="disease"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Identificação da Doença*</Form.Label>
              <Form.Control>
                <Combobox
                  search={searchCultivationDisease}
                  items={allGeneralCultivationDiseases}
                  loading={isLoadingAllCultivationDiseases}
                  selected={field.value}
                  handleSearch={(value) => setSearchCultivationDisease(value)}
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

CultivationDiseaseFormInputs.displayName = 'CultivationDiseaseFormInputs'
