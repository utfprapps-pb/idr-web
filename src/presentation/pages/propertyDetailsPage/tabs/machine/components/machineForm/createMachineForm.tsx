import React, { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { MachineDataFactory } from '@/main/factories/useCases/machine'
import { Button, Form, Sheet } from '@/presentation/components/ui'
import { useHookForm } from '@/presentation/hooks'

import { useMachineContext } from '../../hooks/useMachineContext'

import { PROPERTY_DEFAULT_VALUES } from './constants'
import { MachineFormInputs } from './machineFormInputs'
import { machineSchema, type MachineFormData } from './validation'

export const CreateMachineForm: React.FC = () => {
  const { propertyId, isOpenNewMachineForm, closeNewMachineForm } =
    useMachineContext()

  const createMachine = MachineDataFactory.makeRemoteCreateMachine()

  const queryClient = useQueryClient()

  const form = useHookForm<MachineFormData>({
    defaultValues: PROPERTY_DEFAULT_VALUES,
    resolver: zodResolver(machineSchema),
  })

  const { reset, handleSubmit: hookFormSubmit } = form

  const { mutateAsync: mutateHandleCreateMachine } = useMutation({
    mutationFn: createMachine.execute,
  })

  const handleCreateMachine = useCallback(
    async (data: MachineFormData) => {
      try {
        await mutateHandleCreateMachine({
          propertyId,
          machine: data,
        })
        queryClient.invalidateQueries({
          queryKey: ['machines'],
          exact: false,
        })
        toast.success('Máquina foi cadastrada com sucesso')
        reset(PROPERTY_DEFAULT_VALUES)
        closeNewMachineForm()
      } catch {
        toast.error('Erro ao cadastrar máquina')
      }
    },
    [
      closeNewMachineForm,
      mutateHandleCreateMachine,
      propertyId,
      queryClient,
      reset,
    ]
  )

  return (
    <Sheet.Root open={isOpenNewMachineForm} onOpenChange={closeNewMachineForm}>
      <Sheet.Content className="overflow-y-scroll h-screen" side="right">
        <Sheet.Header>
          <Sheet.Title>Nova Máquina</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar uma nova máquina
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <form
            id="create-machine-form"
            className="flex flex-col h-full gap-4"
            onSubmit={hookFormSubmit(handleCreateMachine)}
          >
            <MachineFormInputs />
          </form>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            form="create-machine-form"
            type="submit"
            className="w-full"
            disabled={form.buttonDisabled}
          >
            Criar
          </Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
  )
}
