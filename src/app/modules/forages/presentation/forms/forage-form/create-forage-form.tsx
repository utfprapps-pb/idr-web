import { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { Button, Form, Sheet } from '@/core/presentation/components/ui'
import { useHookForm } from '@/core/presentation/hooks'

import { makeRemoteCreateForageUseCase } from '../../../main/factories/use-cases'
import { useForageContext } from '../../hooks/forage-context.hook'
import {
  forageFormSchema,
  type ForageFormSchema,
} from '../../validations/forage-form-schema'

import { ForageFormInputs } from './forage-form-inputs'
import { FORAGE_INITIAL_FORM_DATA } from './forage-initial-form-data'

export function CreateForageForm() {
  const { propertyId, isOpenNewForageForm, closeNewForageForm } =
    useForageContext()

  const createForageUseCase = makeRemoteCreateForageUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<ForageFormSchema>({
    defaultValues: FORAGE_INITIAL_FORM_DATA,
    resolver: zodResolver(forageFormSchema),
  })

  const { mutateAsync: mutateHandleCreateForage } = useMutation({
    mutationFn: createForageUseCase.execute,
  })

  const handleCreateForage = useCallback(
    async (data: ForageFormSchema) => {
      try {
        await mutateHandleCreateForage({
          propertyId,
          forage: data,
        })

        queryClient.invalidateQueries({
          queryKey: ['forages'],
          exact: false,
        })

        toast.success('Forrageira foi cadastrada com sucesso')
        form.reset(FORAGE_INITIAL_FORM_DATA)
        closeNewForageForm()
      } catch {
        toast.error('Erro ao cadastrar forrageira')
      }
    },
    [
      closeNewForageForm,
      form,
      mutateHandleCreateForage,
      propertyId,
      queryClient,
    ]
  )

  return (
    <Sheet.Root open={isOpenNewForageForm} onOpenChange={closeNewForageForm}>
      <Sheet.Content className="overflow-y-scroll h-screen" side="right">
        <Sheet.Header>
          <Sheet.Title>Nova Forrageira</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar uma nova forrageira
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <form
            id="create-forage-form"
            className="flex flex-col h-full gap-4"
            onSubmit={form.handleSubmit(handleCreateForage)}
          >
            <ForageFormInputs />
          </form>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            form="create-forage-form"
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

CreateForageForm.displayName = 'CreateForageForm'
