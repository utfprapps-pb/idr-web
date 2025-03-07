import { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { moneyMask, percentMask } from '@/core/masker'
import { Button, Form, Loading, Sheet } from '@/core/presentation/components/ui'
import { useHookForm } from '@/core/presentation/hooks'

import { makeRemoteUpdateMachineUseCase } from '../../../main/factories/use-cases'
import { useMachineContext } from '../../hooks/machine-context.hook'
import { useMachineQuery } from '../../hooks/queries/machine-query.hook'
import {
  machineFormSchema,
  type MachineFormSchema,
} from '../../validation/machine-form-schema'

import { MachineFormInputs } from './machine-form-inputs'
import { MACHINE_INITIAL_FORM_DATA } from './machine-initial-form-data'

export function EditMachineForm() {
  const {
    propertyId,
    isOpenEditMachineForm,
    closeEditMachineForm,
    selectedMachine,
  } = useMachineContext()

  const { isLoading, machine } = useMachineQuery({
    id: selectedMachine!.id,
    propertyId,
  })

  const updateMachineUseCase = makeRemoteUpdateMachineUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<MachineFormSchema>({
    defaultValues: MACHINE_INITIAL_FORM_DATA,
    ...(machine && {
      values: {
        ...machine,
        unitPrice: moneyMask(machine.unitPrice),
        percentDairyCattle: percentMask(machine.percentDairyCattle),
        moneyDairyCattle: moneyMask(machine.moneyDairyCattle),
      },
    }),
    resolver: zodResolver(machineFormSchema),
  })

  const { mutateAsync: mutateHandleUpdateMachine } = useMutation({
    mutationFn: updateMachineUseCase.execute,
  })

  const handleUpdateMachine = useCallback(
    async (data: MachineFormSchema) => {
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
        form.reset(MACHINE_INITIAL_FORM_DATA)
        closeEditMachineForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      closeEditMachineForm,
      form,
      mutateHandleUpdateMachine,
      propertyId,
      queryClient,
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
          <Sheet.Title>
            {`Editar a Máquina ${selectedMachine?.name}`}
          </Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar a máquina
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <form
            id="update-machine-form"
            className="flex flex-col h-full gap-4"
            onSubmit={form.handleSubmit(handleUpdateMachine)}
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

EditMachineForm.displayName = 'EditMachineForm'
