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

import { makeRemoteUpdateCultivationDiseaseUseCase } from '../../../main/factories/use-cases/cultivation-diseases-use-cases'
import { useCultivationDiseaseContext } from '../../hooks/cultivation-disease-context.hook'
import { useCultivationDiseaseQuery } from '../../hooks/queries/cultivation-disease-query.hook'
import {
  cultivationDiseaseFormSchema,
  type CultivationDiseaseFormSchema,
} from '../../validations/cultivation-disease-form-schema'

import { CultivationDiseaseFormInputs } from './cultivation-disease-form-inputs'
import { CULTIVATION_DISEASE_INITIAL_FORM_DATA } from './cultivation-disease-initial-form-data'

export function EditCultivationDiseaseForm() {
  const {
    propertyId,
    isOpenEditCultivationDiseaseForm,
    closeEditCultivationDiseaseForm,
    selectedCultivationDisease,
  } = useCultivationDiseaseContext()

  const { isLoading, cultivationDisease } = useCultivationDiseaseQuery({
    id: selectedCultivationDisease!.id,
    propertyId,
  })

  const updateCultivationDiseaseUseCase =
    makeRemoteUpdateCultivationDiseaseUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<CultivationDiseaseFormSchema>({
    defaultValues: CULTIVATION_DISEASE_INITIAL_FORM_DATA,
    ...(cultivationDisease && {
      values: {
        ...cultivationDisease,
      },
    }),
    resolver: zodResolver(cultivationDiseaseFormSchema),
  })

  const { mutateAsync: mutateHandleUpdateCultivationDisease } = useMutation({
    mutationFn: updateCultivationDiseaseUseCase.execute,
  })

  const handleUpdateCultivationDisease = useCallback(
    async (data: CultivationDiseaseFormSchema) => {
      try {
        if (!selectedCultivationDisease) {
          toast.error('Erro ao atualizar doença do cultivo')
          return
        }

        await mutateHandleUpdateCultivationDisease({
          cultivationDisease: {
            ...data,
            id: selectedCultivationDisease.id,
          },
          propertyId,
        })
        queryClient.invalidateQueries({
          queryKey: ['cultivation-diseases'],
          exact: false,
        })
        toast.success('Doença do cultivo foi editada com sucesso')
        form.reset(CULTIVATION_DISEASE_INITIAL_FORM_DATA)
        closeEditCultivationDiseaseForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      closeEditCultivationDiseaseForm,
      form,
      mutateHandleUpdateCultivationDisease,
      propertyId,
      queryClient,
      selectedCultivationDisease,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenEditCultivationDiseaseForm}
      onOpenChange={closeEditCultivationDiseaseForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>
            Editar Doença do cultivo {cultivationDisease?.cultivation.label}?
          </Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar a doença do cultivo
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="update-cultivation-disease-form"
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleUpdateCultivationDisease)}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <Loading size="lg" />
                </div>
              ) : (
                <CultivationDiseaseFormInputs />
              )}
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            type="submit"
            form="update-cultivation-disease-form"
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

EditCultivationDiseaseForm.displayName = 'EditCultivationDiseaseForm'
