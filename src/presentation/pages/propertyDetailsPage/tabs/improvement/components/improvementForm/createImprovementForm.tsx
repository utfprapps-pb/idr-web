import React, { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { ImprovementDataFactory } from '@/main/factories/useCases/improvement'
import { Button, Form, Sheet } from '@/presentation/components/ui'
import { useHookForm } from '@/presentation/hooks'

import { useImprovementContext } from '../../hooks/useImprovementContext'

import { PROPERTY_DEFAULT_VALUES } from './constants'
import { ImprovementFormInputs } from './improvementFormInputs'
import { improvementSchema, type ImprovementFormData } from './validation'

export const CreateImprovementForm: React.FC = () => {
  const { propertyId, isOpenNewImprovementForm, closeNewImprovementForm } =
    useImprovementContext()

  const createImprovement = ImprovementDataFactory.makeRemoteCreateImprovement()

  const queryClient = useQueryClient()

  const form = useHookForm<ImprovementFormData>({
    defaultValues: PROPERTY_DEFAULT_VALUES,
    resolver: zodResolver(improvementSchema),
  })

  const { reset, handleSubmit: hookFormSubmit } = form

  const { mutateAsync: mutateHandleCreateImprovement } = useMutation({
    mutationFn: createImprovement.execute,
  })

  const handleCreateImprovement = useCallback(
    async (data: ImprovementFormData) => {
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
        reset(PROPERTY_DEFAULT_VALUES)
        closeNewImprovementForm()
      } catch {
        toast.error('Erro ao cadastrar benfeitoria')
      }
    },
    [
      closeNewImprovementForm,
      mutateHandleCreateImprovement,
      propertyId,
      queryClient,
      reset,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenNewImprovementForm}
      onOpenChange={closeNewImprovementForm}
    >
      <Sheet.Content className="overflow-y-scroll h-screen" side="right">
        <Sheet.Header>
          <Sheet.Title>Nova Benfeitoria</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar uma nova benfeitoria
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <form
            id="create-improvement-form"
            className="flex flex-col h-full gap-4"
            onSubmit={hookFormSubmit(handleCreateImprovement)}
          >
            <ImprovementFormInputs />
          </form>
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
