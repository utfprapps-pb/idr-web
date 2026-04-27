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

import { makeRemoteCreateForageAvailabilityUseCase } from '../../../main/factories/use-cases/forage-availability-use-cases'
import { useForageAvailabilityContext } from '../../hooks/forage-availability-context.hook'
import {
  forageAvailabilityFormSchema,
  type ForageAvailabilityFormSchema,
} from '../../validations/forage-availability-form-schema'

import { ForageAvailabilityFormInputs } from './forage-availability-form-inputs'
import { FORAGE_AVAILABILITY_INITIAL_FORM_DATA } from './forage-availability-initial-form-data'

export function CreateForageAvailabilityForm() {
  const {
    propertyId,
    isOpenNewForageAvailabilityForm,
    closeNewForageAvailabilityForm,
  } = useForageAvailabilityContext()

  const createForageAvailabilityUseCase =
    makeRemoteCreateForageAvailabilityUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<ForageAvailabilityFormSchema>({
    defaultValues: FORAGE_AVAILABILITY_INITIAL_FORM_DATA,
    resolver: zodResolver(forageAvailabilityFormSchema),
  })

  const { mutateAsync: mutateHandleCreateForageAvailability } = useMutation({
    mutationFn: createForageAvailabilityUseCase.execute,
  })

  const handleCreateForageAvailability = useCallback(
    async (data: ForageAvailabilityFormSchema) => {
      try {
        await mutateHandleCreateForageAvailability({
          propertyId,
          forageAvailability: data,
        })

        queryClient.invalidateQueries({
          queryKey: ['forage-availabilities'],
          exact: false,
        })

        toast.success('Disponibilidade de forragem cadastrada com sucesso')

        form.reset(FORAGE_AVAILABILITY_INITIAL_FORM_DATA)

        closeNewForageAvailabilityForm()
      } catch {
        toast.error('Erro ao cadastrar disponibilidade de forragem')
      }
    },
    [
      closeNewForageAvailabilityForm,
      form,
      mutateHandleCreateForageAvailability,
      propertyId,
      queryClient,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenNewForageAvailabilityForm}
      onOpenChange={closeNewForageAvailabilityForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Nova Disponibilidade de Forragem</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar um novo registro
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="create-forage-availability-form"
              className="flex flex-col px-2 gap-4"
              onSubmit={form.handleSubmit(handleCreateForageAvailability)}
            >
              <ForageAvailabilityFormInputs />
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            form="create-forage-availability-form"
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

CreateForageAvailabilityForm.displayName = 'CreateForageAvailabilityForm'
