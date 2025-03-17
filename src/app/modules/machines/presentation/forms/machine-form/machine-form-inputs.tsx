import { useEffect } from 'react'

import { InfoIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { moneyMask, onlyNumbersMask, percentMask } from '@/core/masker'
import {
  DatePicker,
  Form,
  Input,
  Tooltip,
} from '@/core/presentation/components/ui'

import type { MachineFormSchema } from '../../validation/machine-form-schema'

export function MachineFormInputs() {
  const form = useFormContext<MachineFormSchema>()

  useEffect(() => {
    const machineAmount = Number(onlyNumbersMask(form.getValues('amount')))
    const machineUnitPrice =
      Number(onlyNumbersMask(form.getValues('unitPrice'))) / 100

    const machineTotalPrice = machineAmount * machineUnitPrice
    const machinePercentDairyCattle =
      Number(onlyNumbersMask(form.getValues('percentDairyCattle'))) / 100

    const moneyDairyCattle = (
      machineTotalPrice *
      (machinePercentDairyCattle / 100)
    ).toFixed(2)

    form.setValue('moneyDairyCattle', moneyMask(moneyDairyCattle))
  }, [form])

  return (
    <>
      <Form.Field
        name="name"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Nome da máquina*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="Trator"
                  isError={!!error?.message}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="amount"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Quantidade*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="10"
                  isError={!!error?.message}
                  mask={onlyNumbersMask}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="unitPrice"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Valor unitário da nova máquina*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="R$ 9,90"
                  isError={!!error?.message}
                  mask={moneyMask}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="percentDairyCattle"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>% Para Gado de Leite*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="10%"
                  isError={!!error?.message}
                  mask={percentMask}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="usefulLife"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Vida útil (anos)*</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="8"
                  isError={!!error?.message}
                  mask={onlyNumbersMask}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )
        }}
      />

      <Form.Field
        name="acquisitionDate"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <Form.Label>Data de Aquisição*</Form.Label>
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
        name="moneyDairyCattle"
        control={form.control}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <Form.Item>
              <div className="flex items-center gap-2">
                <Form.Label>Valor para o Gado de Leite*</Form.Label>
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger type="button">
                      <InfoIcon className="size-4" />
                    </Tooltip.Trigger>

                    <Tooltip.Content>
                      Campo calculado automaticamente
                    </Tooltip.Content>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </div>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="R$ 9,90"
                  isError={!!error?.message}
                  mask={moneyMask}
                  disabled
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

MachineFormInputs.displayName = 'MachineFormInputs'
