import { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

import {
  Button,
  Form,
  Loading,
  ScrollArea,
  Sheet,
} from '@/core/presentation/components/ui'
import { useHookForm } from '@/core/presentation/hooks'

import { makeRemoteUpdateForageAvailabilityUseCase } from '../../../main/factories/use-cases/forage-availability-use-cases'
import { useForageAvailabilityContext } from '../../hooks/forage-availability-context.hook'
import { useForageAvailabilityQuery } from '../../hooks/queries/forage-availability-query.hook'
import {
  forageAvailabilityFormSchema,
  type ForageAvailabilityFormSchema,
} from '../../validations/forage-availability-form-schema'

import { ForageAvailabilityFormInputs } from './forage-availability-form-inputs'
import { FORAGE_AVAILABILITY_INITIAL_FORM_DATA } from './forage-availability-initial-form-data'

export function EditForageAvailabilityForm() {
  const {
    propertyId,
    isOpenEditForageAvailabilityForm,
    closeEditForageAvailabilityForm,
    selectedForageAvailability,
  } = useForageAvailabilityContext()

  const { isLoading, forageAvailability } = useForageAvailabilityQuery({
    propertyId,
    id: selectedForageAvailability!.id,
  })

  const updateForageAvailabilityUseCase =
    makeRemoteUpdateForageAvailabilityUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<ForageAvailabilityFormSchema>({
    defaultValues: FORAGE_AVAILABILITY_INITIAL_FORM_DATA,
    ...(forageAvailability && {
      values: {
        ...forageAvailability,
        date: new Date(forageAvailability.date),
      },
    }),
    resolver: zodResolver(forageAvailabilityFormSchema),
  })

  const { mutateAsync: mutateHandleUpdateForageAvailability } = useMutation({
    mutationFn: updateForageAvailabilityUseCase.execute,
  })

  const handleUpdateForageAvailability = useCallback(
    async (data: ForageAvailabilityFormSchema) => {
      try {
        if (!selectedForageAvailability?.id) {
          toast.error('Erro ao atualizar disponibilidade de forragem')
          return
        }

        await mutateHandleUpdateForageAvailability({
          propertyId,
          forageAvailability: {
            ...data,
            id: selectedForageAvailability.id,
          },
        })

        queryClient.invalidateQueries({
          queryKey: ['forage-availabilities', propertyId],
          exact: false,
        })

        toast.success('Disponibilidade de forragem editada com sucesso')
        form.reset(FORAGE_AVAILABILITY_INITIAL_FORM_DATA)
        closeEditForageAvailabilityForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      closeEditForageAvailabilityForm,
      form,
      mutateHandleUpdateForageAvailability,
      propertyId,
      queryClient,
      selectedForageAvailability,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenEditForageAvailabilityForm}
      onOpenChange={closeEditForageAvailabilityForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>{`Editar Disponibilidade de Forragem de ${
            selectedForageAvailability?.date &&
            format(selectedForageAvailability.date, 'dd/MM/yyyy')
          }`}</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar o registro
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="update-forage-availability-form"
              className="flex flex-col px-2 gap-4"
              onSubmit={form.handleSubmit(handleUpdateForageAvailability)}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <Loading size="lg" />
                </div>
              ) : (
                <ForageAvailabilityFormInputs />
              )}
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            type="submit"
            form="update-forage-availability-form"
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

EditForageAvailabilityForm.displayName = 'EditForageAvailabilityForm'
