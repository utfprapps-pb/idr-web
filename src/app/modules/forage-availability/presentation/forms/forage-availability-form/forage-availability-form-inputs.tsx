import { useState } from 'react'

import { useFormContext } from 'react-hook-form'

import { useAllForagesQuery } from '@/app/modules/forages/presentation/hooks/queries/all-forages-query.hook'
import { floatMask, onlyNumbersMask } from '@/core/masker'
import {
  Combobox,
  DatePicker,
  Form,
  Input,
} from '@/core/presentation/components/ui'
import { Grouper } from '@/core/presentation/components/utils'
import { useDebounce } from '@/core/presentation/hooks'

import { useForageAvailabilityContext } from '../../hooks/forage-availability-context.hook'
import { type ForageAvailabilityFormSchema } from '../../validations/forage-availability-form-schema'

export function ForageAvailabilityFormInputs() {
  const { propertyId } = useForageAvailabilityContext()
  const form = useFormContext<ForageAvailabilityFormSchema>()

  const [searchForage, setSearchForage] = useState('')
  const debouncedForage = useDebounce({ value: searchForage })

  const { allForages, isLoading: isLoadingForages } = useAllForagesQuery({
    propertyId,
    filters: {
      cultivation: {
        value: debouncedForage,
        type: 'LIKE',
      },
    },
  })

  return (
    <>
      <Form.Field
        control={form.control}
        name="date"
        render={({ field, fieldState }) => (
          <Form.Item>
            <Form.Label>Data*</Form.Label>
            <Form.Control>
              <DatePicker
                date={field.value}
                onSelect={field.onChange}
                label="Selecione a data"
                isError={!!fieldState.error}
              />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />

      <Form.Field
        control={form.control}
        name="forage"
        render={({ field, fieldState }) => (
          <Form.Item>
            <Form.Label>Forrageira*</Form.Label>
            <Form.Control>
              <Combobox
                search={searchForage}
                items={allForages}
                loading={isLoadingForages}
                selected={field.value}
                handleSearch={setSearchForage}
                handleSelect={field.onChange}
                placeholder="Selecione uma forrageira"
                emptyMessage="Nenhuma forrageira encontrada"
                searchPlaceholder="Buscar forrageira"
                isError={!!fieldState.error}
              />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />

      <Grouper>
        <Form.Field
          control={form.control}
          name="entranceCm"
          render={({ field, fieldState }) => (
            <Form.Item>
              <Form.Label>Entrada (cm)*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="Ex: 25,00 cm"
                  mask={(val) => floatMask(val, 'cm')}
                  isError={!!fieldState.error}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name="residueCm"
          render={({ field, fieldState }) => (
            <Form.Item>
              <Form.Label>Resíduo (cm)*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="Ex: 10,00 cm"
                  mask={(val) => floatMask(val, 'cm')}
                  isError={!!fieldState.error}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
      </Grouper>

      <Grouper>
        <Form.Field
          control={form.control}
          name="kgPerSquareMeter"
          render={({ field, fieldState }) => (
            <Form.Item>
              <Form.Label>Kg/m²*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="Ex: 1,50 kg/m²"
                  mask={(val) => floatMask(val, 'kg/m²')}
                  isError={!!fieldState.error}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name="paddockArea"
          render={({ field, fieldState }) => (
            <Form.Item>
              <Form.Label>Área de Piquete (m²)*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="Ex: 1.000,00 m²"
                  mask={(val) => floatMask(val, 'm²')}
                  isError={!!fieldState.error}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
      </Grouper>

      <Grouper>
        <Form.Field
          control={form.control}
          name="efficiencyPercent"
          render={({ field, fieldState }) => (
            <Form.Item>
              <Form.Label>Eficiência (%)*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="Ex: 70,00 %"
                  mask={(val) => floatMask(val, '%')}
                  isError={!!fieldState.error}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name="numberOfCows"
          render={({ field, fieldState }) => (
            <Form.Item>
              <Form.Label>Número de vacas*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="Ex: 50"
                  mask={onlyNumbersMask}
                  isError={!!fieldState.error}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
      </Grouper>
    </>
  )
}

ForageAvailabilityFormInputs.displayName = 'ForageAvailabilityFormInputs'
