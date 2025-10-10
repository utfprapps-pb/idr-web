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

import { makeRemoteCreateForageUseCase } from '../../../main/factories/use-cases'
import { useForageContext } from '../../hooks/forage-context.hook'
import {
  forageFormSchema,
  type ForageFormSchema,
} from '../../validations/forage-form-schema'

import { ForageFormInputs } from './forage-form-inputs'
import { FORAGE_INITIAL_FORM_DATA } from './forage-initial-form-data'
import { CreateForageUseCase } from '../../../domain/use-cases' // Certifique-se de que este import existe!

// ----------------------------------------------------------------------
// FUNÇÃO AUXILIAR PARA REMOVER CAMPOS VAZIOS OU NULOS
const removeEmptyOrNull = (obj: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v != null && v !== '')
  )
}
// ----------------------------------------------------------------------


export function CreateForageForm() {
  const { propertyId, isOpenNewForageForm, closeNewForageForm } =
    useForageContext()

  const createForageUseCase = makeRemoteCreateForageUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<ForageFormSchema>({
    defaultValues: FORAGE_INITIAL_FORM_DATA,
    resolver: zodResolver(forageFormSchema),
  })

  // O tipo do 'mutateHandleCreateForage' é inferido
  const { mutateAsync: mutateHandleCreateForage } = useMutation({
    mutationFn: createForageUseCase.execute,
  })

  // Define o tipo exato que o UseCase espera para o campo forage
  type ForagePayload = Parameters<CreateForageUseCase['execute']>[0]['forage']

  const handleCreateForage = useCallback(
    async (data: ForageFormSchema) => {
      try {
        // 1. Limpa o objeto de dados (retorna Record<string, any>)
        const cleanedForageData = removeEmptyOrNull(data)

        // 2. Aplica o Type Assertion para forçar o tipo correto (ForagePayload)
        // Isso remove o sublinhado!
        const finalForagePayload = cleanedForageData as ForagePayload

        await mutateHandleCreateForage({
          propertyId,
          forage: finalForagePayload, // <--- APLICAÇÃO DO TYPE ASSERTION
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
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Nova Forrageira</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar uma nova forrageira
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="create-forage-form"
              className="flex flex-col px-2 gap-4"
              onSubmit={form.handleSubmit(handleCreateForage)}
            >
              <ForageFormInputs />
            </form>
          </ScrollArea.Root>
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
