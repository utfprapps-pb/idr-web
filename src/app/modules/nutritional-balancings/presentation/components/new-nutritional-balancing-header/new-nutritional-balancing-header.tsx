import { useState, useMemo } from 'react'

import { useFormContext } from 'react-hook-form'

import { useAllAnimalsQuery } from '@/app/modules/animals/presentation/hooks/queries/all-animals-query.hook'
import {
  Breadcrumb,
  Button,
  Combobox,
  Form,
} from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { useNutritionalBalancingContext } from '../../hooks/nutritional-balancing-context.hook'
import { createEmptyNutritionalBalancingEntry } from '../../utils/create-empty-nutritional-balancing-entry'
import { type NutritionalBalancingFormSchema } from '../../validations/nutritional-balancing-form-schema'

type NewNutritionalBalancingHeaderProps = {
  buttonDisabled: boolean
  nutritionalBalancings: NutritionalBalancingFormSchema['nutritionalBalancings']
  handleAppendNutritionalBalancing: (
    data: NutritionalBalancingFormSchema['nutritionalBalancings'][number]
  ) => void
}

export function NewNutritionalBalancingHeader({
  buttonDisabled,
  nutritionalBalancings,
  handleAppendNutritionalBalancing,
}: Readonly<NewNutritionalBalancingHeaderProps>) {
  const form = useFormContext<NutritionalBalancingFormSchema>()
  const { propertyId, closeNewNutritionalBalancingScreen } =
    useNutritionalBalancingContext()

  const [searchAnimal, setSearchAnimal] = useState('')
  const debouncedAnimal = useDebounce({ value: searchAnimal })
  const selectedIds = useMemo(
    () =>
      nutritionalBalancings
        .map((field) => field?.animal?.id)
        .filter((id): id is number => typeof id === 'number' && id > 0),
    [nutritionalBalancings]
  )

  const { allAnimals, isLoading } = useAllAnimalsQuery({
    propertyId,
    filters: {
      name: {
        value: debouncedAnimal,
        type: 'LIKE',
      },
      ...(selectedIds.length
        ? {
            id: {
              value: selectedIds,
              type: 'NOT_IN',
            },
          }
        : {}),
    },
  })

  return (
    <div className="flex justify-between">
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Link onClick={closeNewNutritionalBalancingScreen}>
            Balanceamentos Nutricionais
          </Breadcrumb.Link>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Page>Novo</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>

      <div className="space-y-2">
        <Button type="submit" className="w-full" disabled={buttonDisabled}>
          Salvar Balanceamento
        </Button>

        <Form.Field
          name="nutritionalBalancings"
          control={form.control}
          render={({ fieldState }) => {
            const { error } = fieldState

            return (
              <Form.Item>
                <Form.Control>
                  <Combobox
                    search={searchAnimal}
                    items={allAnimals}
                    loading={isLoading}
                    selected={{
                      label: '',
                      value: 0,
                    }}
                    handleSearch={setSearchAnimal}
                    handleSelect={(selectedAnimal) => {
                      const nextEntry = createEmptyNutritionalBalancingEntry({
                        animal: {
                          id: selectedAnimal.value,
                          name: selectedAnimal.label,
                          breed: selectedAnimal.extraData?.breed ?? '',
                          ecc: selectedAnimal.extraData?.ecc ?? '',
                          weight: selectedAnimal.extraData?.weight ?? '',
                          milkProduction:
                            selectedAnimal.extraData?.milkProduction ?? '',
                          estimatedMilkProduction: '',
                        },
                      })
                      handleAppendNutritionalBalancing(nextEntry)
                    }}
                    isError={!!error}
                    placeholder="Selecione o animal"
                    emptyMessage="Nenhum animal encontrado"
                    searchPlaceholder="Buscar animal"
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )
          }}
        />
      </div>
    </div>
  )
}

NewNutritionalBalancingHeader.displayName = 'NewNutritionalBalancingHeader'
