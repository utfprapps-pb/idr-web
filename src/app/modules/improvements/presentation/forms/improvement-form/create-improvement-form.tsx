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

import { makeRemoteCreateImprovementUseCase } from '../../../main/factories/use-cases'
import { useImprovementContext } from '../../hooks/improvement-context.hook'
import {
  improvementFormSchema,
  type ImprovementFormSchema,
} from '../../validation/improvement-form-schema'

import { ImprovementFormInputs } from './improvement-form-inputs'
import { IMPROVEMENT_INITIAL_FORM_DATA } from './improvement-initial-form-data'

export function CreateImprovementForm() {
  const { propertyId, isOpenNewImprovementForm, closeNewImprovementForm } =
    useImprovementContext()

  const createImprovementUseCase = makeRemoteCreateImprovementUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<ImprovementFormSchema>({
    defaultValues: IMPROVEMENT_INITIAL_FORM_DATA,
    resolver: zodResolver(improvementFormSchema),
  })

  const { mutateAsync: mutateHandleCreateImprovement } = useMutation({
    mutationFn: createImprovementUseCase.execute,
  })

  const handleCreateImprovement = useCallback(
    async (data: ImprovementFormSchema) => {
      try {
        await mutateHandleCreateImprovement({
          propertyId,
          improvement: data,
        })

        queryClient.invalidateQueries({
          queryKey: ['improvements'],
          exact: false,
        })

        toast.success('Benfeitoria foi cadastrada com sucesso')
        form.reset(IMPROVEMENT_INITIAL_FORM_DATA)
        closeNewImprovementForm()
      } catch {
        toast.error('Erro ao cadastrar benfeitoria')
      }
    },
    [
      closeNewImprovementForm,
      form,
      mutateHandleCreateImprovement,
      propertyId,
      queryClient,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenNewImprovementForm}
      onOpenChange={closeNewImprovementForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Nova Benfeitoria</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar uma nova benfeitoria
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="create-improvement-form"
              className="flex flex-col px-2 gap-4"
              onSubmit={form.handleSubmit(handleCreateImprovement)}
            >
              <ImprovementFormInputs />
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            form="create-improvement-form"
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

CreateImprovementForm.displayName = 'CreateImprovementForm'
