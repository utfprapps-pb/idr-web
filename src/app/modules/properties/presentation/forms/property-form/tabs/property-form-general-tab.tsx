import { useMemo, useState } from 'react'

import { PlusIcon, Trash2Icon } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { moneyMask } from '@/core/masker'
import {
  Button,
  Combobox,
  Form,
  Input,
  Label,
} from '@/core/presentation/components/ui'
import { useDebounce, useSearchCitiesQuery } from '@/core/presentation/hooks'

import { usePropertyProducersQuery } from '../../../hooks/queries/property-producers-query.hook'
import { usePropertyUsersQuery } from '../../../hooks/queries/property-users-query.hook'

import type { PropertyFormSchema } from '../../../validations/property-form-schema'
import type { Option } from '@/core/domain/types'

export function PropertyFormGeneralTab() {
  const form = useFormContext<PropertyFormSchema>()

  const {
    fields,
    append: handleAddTechnician,
    remove: handleRemoveTechnician,
    update: handleUpdateTechnician,
  } = useFieldArray({
    name: 'general.responsibleTechnicians',
    control: form.control,
  })

  const [technicianSearch, setTechnicianSearch] = useState('')
  const debouncedTechnicianSearch = useDebounce({ value: technicianSearch })

  const [producerSearch, setProducerSearch] = useState('')
  const debouncedProducerSearch = useDebounce({ value: producerSearch })

  const [citySearch, setCitySearch] = useState('')
  const debouncedCitySearch = useDebounce({ value: citySearch })

  const { producers, isLoading: isLoadingProducers } =
    usePropertyProducersQuery({ terms: debouncedProducerSearch })

  const { cities, isLoading: isLoadingCities } = useSearchCitiesQuery({
    terms: debouncedCitySearch,
  })

  const { users: allUsers, isLoading: isLoadingTechnicians } =
    usePropertyUsersQuery({ terms: debouncedTechnicianSearch })

  const usersToAdd: Option<string>[] = useMemo(
    () =>
      allUsers.filter(
        (user) =>
          !form
            .getValues('general.responsibleTechnicians')
            .some(
              (technician: Option<string>) => technician.value === user.value
            )
      ),
    [allUsers, form]
  )

  return (
    <>
      <Form.Field
        name="general.name"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Nome da Propriedade</Form.Label>
              <Form.Control>
                <Input {...field} isError={!!error?.message} />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />
      <Form.Field
        name="general.producerId"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Produtor</Form.Label>
              <Form.Control>
                <Combobox<string>
                  search={producerSearch}
                  items={producers}
                  loading={isLoadingProducers}
                  selected={field.value}
                  handleSearch={(value) => setProducerSearch(value)}
                  handleSelect={(selected) => field.onChange(selected)}
                  isError={!!error}
                  placeholder="Selecione um produtor"
                  searchPlaceholder="Buscar produtor"
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />
      <Form.Field
        name="general.cityId"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Município</Form.Label>
              <Form.Control>
                <Combobox<string>
                  search={citySearch}
                  items={cities}
                  loading={isLoadingCities}
                  selected={field.value}
                  handleSearch={(value) => setCitySearch(value)}
                  handleSelect={(selected) => field.onChange(selected)}
                  isError={!!error}
                  placeholder="Selecione um município"
                  searchPlaceholder="Buscar município"
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />
      <Form.Field
        name="general.nakedAveragePricePerHectare"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Preço médio da terra nua (R$/ha)</Form.Label>
              <Form.Control>
                <Input {...field} isError={!!error?.message} mask={moneyMask} />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />
      <Form.Field
        name="general.leaseAveragePricePerHectare"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>
                Valor médio de arrendamento para pecuária na região (R$/ha/ano)
              </Form.Label>
              <Form.Control>
                <Input {...field} isError={!!error?.message} mask={moneyMask} />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <div className="flex flex-col gap-3">
        {fields?.length ? (
          <div className="flex flex-col gap-2">
            {fields.map(({ id }, index) => (
              <Form.Field
                key={id}
                name={`general.responsibleTechnicians.${index}`}
                control={form.control}
                render={({ field, formState }) => {
                  const error =
                    formState.errors?.general?.responsibleTechnicians?.[index]
                      ?.message

                  const { value: technician } = field

                  return (
                    <Form.Item>
                      <Form.Label>Técnicos responsáveis</Form.Label>

                      <Form.Control>
                        <div className="flex gap-2">
                          <Combobox<string>
                            key={technician.value}
                            search={technicianSearch}
                            items={usersToAdd}
                            loading={isLoadingTechnicians}
                            selected={technician}
                            handleSearch={(value) => setTechnicianSearch(value)}
                            handleSelect={(selected) =>
                              handleUpdateTechnician(index, selected)
                            }
                            isError={!!error}
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            type="button"
                            onClick={() => handleRemoveTechnician(index)}
                          >
                            <Trash2Icon className="text-destructive" />
                          </Button>
                        </div>
                      </Form.Control>
                      <Form.Message />
                    </Form.Item>
                  )
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Label>Técnicos responsáveis</Label>
            {form.formState.errors.general?.responsibleTechnicians?.root
              ?.message && (
              <Label className="text-destructive">
                {
                  form.formState.errors.general?.responsibleTechnicians?.root
                    ?.message
                }
              </Label>
            )}
          </div>
        )}

        <Button
          variant="outline"
          type="button"
          onClick={() =>
            handleAddTechnician({
              label: '',
              value: '',
            })
          }
        >
          <PlusIcon /> Adicionar novo técnico
        </Button>
      </div>
    </>
  )
}

PropertyFormGeneralTab.displayName = 'PropertyFormGeneralTab'
