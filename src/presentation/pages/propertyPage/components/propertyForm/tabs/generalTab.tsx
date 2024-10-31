import { useEffect, useMemo, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { Plus, Trash2 } from 'lucide-react'
import { useFieldArray } from 'react-hook-form'
import toast from 'react-hot-toast'

import { moneyMask } from '@/masker'
import {
  Input,
  Form,
  Combobox,
  Button,
  Label,
} from '@/presentation/components/ui'
import { useDebounce } from '@/presentation/hooks'

import type { TabProps } from './types'
import type { Option } from '@/domain/shared/types'
import type { IGetAllUsers } from '@/domain/useCases/user'

type GeneralTabProps = TabProps & {
  getAllUsers: IGetAllUsers
}

export const GeneralTab: React.FC<GeneralTabProps> = ({
  form,
  getAllUsers,
}) => {
  const {
    control,
    getValues,
    formState: { errors },
  } = form
  const {
    fields,
    append: handleAddTechnician,
    remove: handleRemoveTechnician,
    update: handleUpdateTechnician,
  } = useFieldArray({
    name: 'general.responsibleTechnicians',
    control,
  })
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce({ value: search, delayInMs: 1000 })

  const {
    data: allUsersData = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['technicians', debouncedSearch],
    queryFn: () => getAllUsers.execute(debouncedSearch),
  })

  const usersToAdd = useMemo(
    () =>
      allUsersData.filter(
        (user) =>
          !getValues('general.responsibleTechnicians').some(
            (technician: Option) => technician.value === user.value
          )
      ),
    [allUsersData, getValues]
  )

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao buscar técnicos')
    }
  }, [isError])

  return (
    <>
      <Form.Field
        name="general.name"
        control={control}
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
        control={control}
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
        control={control}
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
        control={control}
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
        control={control}
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
                control={control}
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
                            <Trash2 className="text-destructive" />
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
            {errors.general?.responsibleTechnicians?.root?.message && (
              <Label className="text-destructive">
                {errors.general?.responsibleTechnicians?.root?.message}
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
          <Plus /> Adicionar novo técnico
        </Button>
      </div>
    </>
  )
}
