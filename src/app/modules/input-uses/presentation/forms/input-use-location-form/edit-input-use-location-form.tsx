import { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import {
  Button,
  Form,
  Loading,
  ScrollArea,
  Sheet,
} from '@/core/presentation/components/ui'
import { useHookForm } from '@/core/presentation/hooks'

import { makeRemoteUpdateInputUseLocationUseCase } from '../../../main/factories/use-cases/input-use-locations-use-cases'
import { useInputUseLocationContext } from '../../hooks/input-use-location-context.hook'
import { useInputUseLocationQuery } from '../../hooks/queries/input-use-location-query.hook'
import {
  inputUseLocationFormSchema,
  type InputUseLocationFormSchema,
} from '../../validations/input-use-location-form-schema'

import { InputUseLocationFormInputs } from './input-use-location-form-inputs'
import { INPUT_USE_LOCATION_INITIAL_FORM_DATA } from './input-use-location-initial-form-data'

export function EditInputUseLocationForm() {
  const {
    isOpenEditInputUseLocationForm,
    closeEditInputUseLocationForm,
    selectedInputUseLocation,
  } = useInputUseLocationContext()

  const { isLoading, inputUseLocation } = useInputUseLocationQuery({
    id: selectedInputUseLocation!.id,
  })

  const updateInputUseLocationUseCase =
    makeRemoteUpdateInputUseLocationUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<InputUseLocationFormSchema>({
    defaultValues: INPUT_USE_LOCATION_INITIAL_FORM_DATA,
    ...(inputUseLocation && {
      values: {
        ...inputUseLocation,
      },
    }),
    resolver: zodResolver(inputUseLocationFormSchema),
  })

  const { mutateAsync: mutateHandleUpdateInputUseLocation } = useMutation({
    mutationFn: updateInputUseLocationUseCase.execute,
  })

  const handleUpdateInputUseLocation = useCallback(
    async (data: InputUseLocationFormSchema) => {
      try {
        if (!selectedInputUseLocation?.id) {
          toast.error('Erro ao atualizar local de utilização')
          return
        }

        await mutateHandleUpdateInputUseLocation({
          inputUseLocation: {
            ...data,
            id: selectedInputUseLocation.id,
          },
        })

        queryClient.invalidateQueries({
          queryKey: ['input-use-locations'],
          exact: false,
        })

        toast.success('Local de utilização foi editado com sucesso')
        form.reset(INPUT_USE_LOCATION_INITIAL_FORM_DATA)
        closeEditInputUseLocationForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      closeEditInputUseLocationForm,
      form,
      mutateHandleUpdateInputUseLocation,
      queryClient,
      selectedInputUseLocation,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenEditInputUseLocationForm}
      onOpenChange={closeEditInputUseLocationForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Editar Local de Utilização</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar o local de utilização
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="update-input-use-location-form"
              className="flex flex-col px-2 gap-4 mt-4"
              onSubmit={form.handleSubmit(handleUpdateInputUseLocation)}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <Loading size="lg" />
                </div>
              ) : (
                <InputUseLocationFormInputs />
              )}
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer className="mt-8">
          <Button
            type="submit"
            form="update-input-use-location-form"
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

EditInputUseLocationForm.displayName = 'EditInputUseLocationForm'
