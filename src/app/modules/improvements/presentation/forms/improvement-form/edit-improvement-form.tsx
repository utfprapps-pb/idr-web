import { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { moneyMask, percentMask } from '@/core/masker'
import {
  Button,
  Form,
  Loading,
  ScrollArea,
  Sheet,
} from '@/core/presentation/components/ui'
import { useHookForm } from '@/core/presentation/hooks'

import { makeRemoteUpdateImprovementUseCase } from '../../../main/factories/use-cases'
import { useImprovementContext } from '../../hooks/improvement-context.hook'
import { useImprovementQuery } from '../../hooks/queries/improvement-query.hook'
import {
  improvementFormSchema,
  type ImprovementFormSchema,
} from '../../validation/improvement-form-schema'

import { ImprovementFormInputs } from './improvement-form-inputs'
import { IMPROVEMENT_INITIAL_FORM_DATA } from './improvement-initial-form-data'

export function EditImprovementForm() {
  const {
    propertyId,
    isOpenEditImprovementForm,
    closeEditImprovementForm,
    selectedImprovement,
  } = useImprovementContext()

  const { isLoading, improvement } = useImprovementQuery({
    id: selectedImprovement!.id,
    propertyId,
  })

  const updateImprovementUseCase = makeRemoteUpdateImprovementUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<ImprovementFormSchema>({
    defaultValues: IMPROVEMENT_INITIAL_FORM_DATA,
    ...(improvement && {
      values: {
        ...improvement,
        unitPrice: moneyMask(improvement.unitPrice),
        percentDairyCattle: percentMask(improvement.percentDairyCattle),
        moneyDairyCattle: moneyMask(improvement.moneyDairyCattle),
      },
    }),
    resolver: zodResolver(improvementFormSchema),
  })

  const { mutateAsync: mutateHandleUpdateImprovement } = useMutation({
    mutationFn: updateImprovementUseCase.execute,
  })

  const handleUpdateImprovement = useCallback(
    async (data: ImprovementFormSchema) => {
      try {
        if (!selectedImprovement) {
          toast.error('Erro ao atualizar benfeitoria')
          return
        }

        await mutateHandleUpdateImprovement({
          improvement: {
            ...data,
            id: selectedImprovement.id,
          },
          propertyId,
        })

        queryClient.invalidateQueries({
          queryKey: ['improvements'],
          exact: false,
        })

        toast.success('Benfeitoria foi editada com sucesso')
        form.reset(IMPROVEMENT_INITIAL_FORM_DATA)
        closeEditImprovementForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      closeEditImprovementForm,
      form,
      mutateHandleUpdateImprovement,
      propertyId,
      queryClient,
      selectedImprovement,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenEditImprovementForm}
      onOpenChange={closeEditImprovementForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>{`Editar Benfeitoria ${selectedImprovement?.description}`}</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar a benfeitoria
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="update-improvement-form"
              className="flex flex-col px-2 gap-4"
              onSubmit={form.handleSubmit(handleUpdateImprovement)}
            >
              {isLoading ? (
                <div className="flex justify-center h-full items-center">
                  <Loading size="lg" />
                </div>
              ) : (
                <ImprovementFormInputs />
              )}
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            type="submit"
            form="update-improvement-form"
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

EditImprovementForm.displayName = 'EditImprovementForm'
