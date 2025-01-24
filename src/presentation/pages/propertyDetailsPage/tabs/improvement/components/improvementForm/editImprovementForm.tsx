import React, { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { ImprovementDataFactory } from '@/main/factories/useCases/improvement'
import { moneyMask, percentMask } from '@/masker'
import { Button, Form, Loading, Sheet } from '@/presentation/components/ui'
import { useHookForm } from '@/presentation/hooks'

import { useImprovement } from '../../hooks/useImprovement'
import { useImprovementContext } from '../../hooks/useImprovementContext'

import { PROPERTY_DEFAULT_VALUES } from './constants'
import { ImprovementFormInputs } from './improvementFormInputs'
import { improvementSchema, type ImprovementFormData } from './validation'

export const EditImprovementForm: React.FC = () => {
  const {
    propertyId,
    isOpenEditImprovementForm,
    closeEditImprovementForm,
    selectedImprovement,
  } = useImprovementContext()

  const { isLoading, improvement } = useImprovement({
    id: selectedImprovement!.id,
    propertyId,
  })

  const updateImprovement = ImprovementDataFactory.makeRemoteUpdateImprovement()

  const queryClient = useQueryClient()

  const form = useHookForm<ImprovementFormData>({
    defaultValues: PROPERTY_DEFAULT_VALUES,
    ...(improvement && {
      values: {
        ...improvement,
        unitPrice: moneyMask(improvement.unitPrice),
        percentDairyCattle: percentMask(improvement.percentDairyCattle),
        moneyDairyCattle: moneyMask(improvement.moneyDairyCattle),
      },
    }),
    resolver: zodResolver(improvementSchema),
  })

  const { reset, handleSubmit: hookFormSubmit } = form

  const { mutateAsync: mutateHandleUpdateImprovement } = useMutation({
    mutationFn: updateImprovement.execute,
  })

  const handleUpdateImprovement = useCallback(
    async (data: ImprovementFormData) => {
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
        reset(PROPERTY_DEFAULT_VALUES)
        closeEditImprovementForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      closeEditImprovementForm,
      mutateHandleUpdateImprovement,
      propertyId,
      queryClient,
      reset,
      selectedImprovement,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenEditImprovementForm}
      onOpenChange={closeEditImprovementForm}
    >
      <Sheet.Content className="overflow-y-scroll h-screen" side="right">
        <Sheet.Header>
          <Sheet.Title>{`Editar Benfeitoria ${selectedImprovement?.description}`}</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar a benfeitoria
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <form
            id="update-improvement-form"
            className="flex flex-col h-full gap-4"
            onSubmit={hookFormSubmit(handleUpdateImprovement)}
          >
            {isLoading ? (
              <div className="flex justify-center h-full items-center">
                <Loading size="lg" />
              </div>
            ) : (
              <ImprovementFormInputs />
            )}
          </form>
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
