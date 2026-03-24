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

import { makeRemoteUpdateCultivationPestUseCase } from '../../../main/factories/use-cases/cultivation-pests-use-cases'
import { useCultivationPestContext } from '../../hooks/cultivation-pest-context.hook'
import { useCultivationPestQuery } from '../../hooks/queries/cultivation-pest-query.hook'
import {
  cultivationPestFormSchema,
  type CultivationPestFormSchema,
} from '../../validations/cultivation-pest-form-schema'

import { CultivationPestFormInputs } from './cultivation-pest-form-inputs'
import { CULTIVATION_PEST_INITIAL_FORM_DATA } from './cultivation-pest-initial-form-data'

export function EditCultivationPestForm() {
  const {
    propertyId,
    isOpenEditCultivationPestForm,
    closeEditCultivationPestForm,
    selectedCultivationPest,
  } = useCultivationPestContext()

  const { isLoading, cultivationPest } = useCultivationPestQuery({
    id: selectedCultivationPest!.id,
    propertyId,
  })

  const updateCultivationPestUseCase = makeRemoteUpdateCultivationPestUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<CultivationPestFormSchema>({
    defaultValues: CULTIVATION_PEST_INITIAL_FORM_DATA,
    ...(cultivationPest && {
      values: {
        ...cultivationPest,
      },
    }),
    resolver: zodResolver(cultivationPestFormSchema),
  })

  const { mutateAsync: mutateHandleUpdateCultivationPest } = useMutation({
    mutationFn: updateCultivationPestUseCase.execute,
  })

  const handleUpdateCultivationPest = useCallback(
    async (data: CultivationPestFormSchema) => {
      try {
        if (!selectedCultivationPest) {
          toast.error('Erro ao atualizar praga do cultivo')
          return
        }

        await mutateHandleUpdateCultivationPest({
          cultivationPest: {
            ...data,
            id: selectedCultivationPest.id,
          },
          propertyId,
        })
        queryClient.invalidateQueries({
          queryKey: ['cultivation-pests'],
          exact: false,
        })
        toast.success('Praga do cultivo foi editada com sucesso')
        form.reset(CULTIVATION_PEST_INITIAL_FORM_DATA)
        closeEditCultivationPestForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      closeEditCultivationPestForm,
      form,
      mutateHandleUpdateCultivationPest,
      propertyId,
      queryClient,
      selectedCultivationPest,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenEditCultivationPestForm}
      onOpenChange={closeEditCultivationPestForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>
            Editar Praga do cultivo {cultivationPest?.cultivation.label}?
          </Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar a praga do cultivo
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="update-cultivation-pest-form"
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleUpdateCultivationPest)}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <Loading size="lg" />
                </div>
              ) : (
                <CultivationPestFormInputs />
              )}
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            type="submit"
            form="update-cultivation-pest-form"
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

EditCultivationPestForm.displayName = 'EditCultivationPestForm'
