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

import { makeRemoteCreateInputUseLocationUseCase } from '../../../main/factories/use-cases/input-use-locations-use-cases'
import { useInputUseLocationContext } from '../../hooks/input-use-location-context.hook'
import {
  inputUseLocationFormSchema,
  type InputUseLocationFormSchema,
} from '../../validations/input-use-location-form-schema'

import { InputUseLocationFormInputs } from './input-use-location-form-inputs'
import { INPUT_USE_LOCATION_INITIAL_FORM_DATA } from './input-use-location-initial-form-data'

export function CreateInputUseLocationForm() {
  const { isOpenNewInputUseLocationForm, closeNewInputUseLocationForm } =
    useInputUseLocationContext()

  const createInputUseLocationUseCase =
    makeRemoteCreateInputUseLocationUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<InputUseLocationFormSchema>({
    defaultValues: INPUT_USE_LOCATION_INITIAL_FORM_DATA,
    resolver: zodResolver(inputUseLocationFormSchema),
  })

  const { mutateAsync: mutateHandleCreateInputUseLocation } = useMutation({
    mutationFn: createInputUseLocationUseCase.execute,
  })

  const handleCreateInputUseLocation = useCallback(
    async (data: InputUseLocationFormSchema) => {
      try {
        await mutateHandleCreateInputUseLocation({
          inputUseLocation: data,
        })

        queryClient.invalidateQueries({
          queryKey: ['input-use-locations'],
          exact: false,
        })

        toast.success('Local de utilização cadastrado com sucesso')

        form.reset(INPUT_USE_LOCATION_INITIAL_FORM_DATA)

        closeNewInputUseLocationForm()
      } catch {
        toast.error('Erro ao cadastrar local de utilização')
      }
    },
    [
      closeNewInputUseLocationForm,
      form,
      mutateHandleCreateInputUseLocation,
      queryClient,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenNewInputUseLocationForm}
      onOpenChange={closeNewInputUseLocationForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Novo Local de Utilização</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar um novo local de utilização
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="create-input-use-location-form"
              className="flex flex-col px-2 gap-4 mt-4"
              onSubmit={form.handleSubmit(handleCreateInputUseLocation)}
            >
              <InputUseLocationFormInputs />
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer className="mt-8">
          <Button
            form="create-input-use-location-form"
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

CreateInputUseLocationForm.displayName = 'CreateInputUseLocationForm'
