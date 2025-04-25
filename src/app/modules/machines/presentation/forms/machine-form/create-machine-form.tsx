import { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import {
  Button,
  Form,
  ScrollArea,
  Sheet,
} from '@/core/presentation/components/ui'
import { useHookForm } from '@/core/presentation/hooks'

import { makeRemoteCreateMachineUseCase } from '../../../main/factories/use-cases'
import { useMachineContext } from '../../hooks/machine-context.hook'
import {
  machineFormSchema,
  type MachineFormSchema,
} from '../../validation/machine-form-schema'

import { MachineFormInputs } from './machine-form-inputs'
import { MACHINE_INITIAL_FORM_DATA } from './machine-initial-form-data'

export function CreateMachineForm() {
  const { propertyId, isOpenNewMachineForm, closeNewMachineForm } =
    useMachineContext()

  const createMachineUseCase = makeRemoteCreateMachineUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<MachineFormSchema>({
    defaultValues: MACHINE_INITIAL_FORM_DATA,
    resolver: zodResolver(machineFormSchema),
  })

  const { mutateAsync: mutateHandleCreateMachine } = useMutation({
    mutationFn: createMachineUseCase.execute,
  })

  const handleCreateMachine = useCallback(
    async (data: MachineFormSchema) => {
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
        form.reset(MACHINE_INITIAL_FORM_DATA)
        closeNewMachineForm()
      } catch {
        toast.error('Erro ao cadastrar máquina')
      }
    },
    [
      closeNewMachineForm,
      form,
      mutateHandleCreateMachine,
      propertyId,
      queryClient,
    ]
  )

  return (
    <Sheet.Root open={isOpenNewMachineForm} onOpenChange={closeNewMachineForm}>
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Nova Máquina</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar uma nova máquina
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="create-machine-form"
              className="flex flex-col px-2 gap-4"
              onSubmit={form.handleSubmit(handleCreateMachine)}
            >
              <MachineFormInputs />
            </form>
          </ScrollArea.Root>
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

CreateMachineForm.displayName = 'CreateMachineForm'
