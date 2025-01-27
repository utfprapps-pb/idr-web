import React, { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { MachineDataFactory } from '@/main/factories/useCases/machine'
import { moneyMask, percentMask } from '@/masker'
import { Button, Form, Loading, Sheet } from '@/presentation/components/ui'
import { useHookForm } from '@/presentation/hooks'

import { useMachine } from '../../hooks/useMachine'
import { useMachineContext } from '../../hooks/useMachineContext'

import { PROPERTY_DEFAULT_VALUES } from './constants'
import { MachineFormInputs } from './machineFormInputs'
import { machineSchema, type MachineFormData } from './validation'

export const EditMachineForm: React.FC = () => {
  const {
    propertyId,
    isOpenEditMachineForm,
    closeEditMachineForm,
    selectedMachine,
  } = useMachineContext()

  const { isLoading, machine } = useMachine({
    id: selectedMachine!.id,
    propertyId,
  })

  const updateMachine = MachineDataFactory.makeRemoteUpdateMachine()

  const queryClient = useQueryClient()

  const form = useHookForm<MachineFormData>({
    defaultValues: PROPERTY_DEFAULT_VALUES,
    ...(machine && {
      values: {
        ...machine,
        unitPrice: moneyMask(machine.unitPrice),
        percentDairyCattle: percentMask(machine.percentDairyCattle),
        moneyDairyCattle: moneyMask(machine.moneyDairyCattle),
      },
    }),
    resolver: zodResolver(machineSchema),
  })

  const { reset, handleSubmit: hookFormSubmit } = form

  const { mutateAsync: mutateHandleUpdateMachine } = useMutation({
    mutationFn: updateMachine.execute,
  })

  const handleUpdateMachine = useCallback(
    async (data: MachineFormData) => {
      try {
        if (!selectedMachine) {
          toast.error('Erro ao atualizar máquina')
          return
        }

        await mutateHandleUpdateMachine({
          machine: {
            ...data,
            id: selectedMachine.id,
          },
          propertyId,
        })
        queryClient.invalidateQueries({
          queryKey: ['machines'],
          exact: false,
        })
        toast.success('Máquina foi editada com sucesso')
        reset(PROPERTY_DEFAULT_VALUES)
        closeEditMachineForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      closeEditMachineForm,
      mutateHandleUpdateMachine,
      propertyId,
      queryClient,
      reset,
      selectedMachine,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenEditMachineForm}
      onOpenChange={closeEditMachineForm}
    >
      <Sheet.Content className="overflow-y-scroll h-screen" side="right">
        <Sheet.Header>
          <Sheet.Title>{`Editar a Máquina ${selectedMachine?.name}`}</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar a máquina
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <form
            id="update-machine-form"
            className="flex flex-col h-full gap-4"
            onSubmit={hookFormSubmit(handleUpdateMachine)}
          >
            {isLoading ? (
              <div className="flex justify-center h-full items-center">
                <Loading size="lg" />
              </div>
            ) : (
              <MachineFormInputs />
            )}
          </form>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            type="submit"
            form="update-machine-form"
            className="w-full"
            disabled={form.buttonDisabled}
          >
            Salvar
          </Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
  )
}
