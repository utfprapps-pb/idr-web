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
import { useAllUsersQuery, useDebounce } from '@/core/presentation/hooks'

import { PropertyFormSchema } from '../../../validations/property-form-schema'

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

  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce({ value: search, delayInMs: 1000 })

  const { allUsers, isLoading } = useAllUsersQuery(debouncedSearch)

  const usersToAdd: Option[] = useMemo(
    () =>
      allUsers.filter(
        (user) =>
          !form
            .getValues('general.responsibleTechnicians')
            .some((technician: Option) => technician.value === user.value)
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
        name="general.city"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Município</Form.Label>
              <Form.Control>
                <Input {...field} isError={!!error?.message} />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />
      <Form.Field
        name="general.producer"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Produtor</Form.Label>
              <Form.Control>
                <Input {...field} isError={!!error?.message} />
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
                      <Form.Label>Técnicos responsáveis </Form.Label>

                      <Form.Control>
                        <div className="flex gap-2">
                          <Combobox
                            key={technician.value}
                            search={search}
                            items={usersToAdd}
                            loading={isLoading}
                            selected={technician}
                            handleSearch={(value) => setSearch(value)}
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
