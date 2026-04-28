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

import { makeRemoteCreateCultivationDiseaseUseCase } from '../../../main/factories/use-cases/cultivation-diseases-use-cases'
import { useCultivationDiseaseContext } from '../../hooks/cultivation-disease-context.hook'
import {
  cultivationDiseaseFormSchema,
  CultivationDiseaseFormSchema,
} from '../../validations/cultivation-disease-form-schema'

import { CultivationDiseaseFormInputs } from './cultivation-disease-form-inputs'
import { CULTIVATION_DISEASE_INITIAL_FORM_DATA } from './cultivation-disease-initial-form-data'

export function CreateCultivationDiseaseForm() {
  const {
    propertyId,
    isOpenNewCultivationDiseaseForm,
    closeNewCultivationDiseaseForm,
  } = useCultivationDiseaseContext()

  const createCultivationDiseaseUseCase =
    makeRemoteCreateCultivationDiseaseUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<CultivationDiseaseFormSchema>({
    defaultValues: CULTIVATION_DISEASE_INITIAL_FORM_DATA,
    resolver: zodResolver(cultivationDiseaseFormSchema),
  })

  const { mutateAsync: mutateHandleCreateCultivationDisease } = useMutation({
    mutationFn: createCultivationDiseaseUseCase.execute,
  })

  const handleCreateCultivationDisease = useCallback(
    async (data: CultivationDiseaseFormSchema) => {
      try {
        await mutateHandleCreateCultivationDisease({
          propertyId,
          cultivationDisease: data,
        })

        queryClient.invalidateQueries({
          queryKey: ['cultivation-diseases', propertyId],
          exact: false,
        })

        toast.success('Doença do cultivo foi cadastrado com sucesso')

        form.reset(CULTIVATION_DISEASE_INITIAL_FORM_DATA)

        closeNewCultivationDiseaseForm()
      } catch {
        toast.error('Erro ao cadastrar doença do cultivo')
      }
    },
    [
      closeNewCultivationDiseaseForm,
      form,
      mutateHandleCreateCultivationDisease,
      propertyId,
      queryClient,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenNewCultivationDiseaseForm}
      onOpenChange={closeNewCultivationDiseaseForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Nova Doença</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar uma nova doença do cultivo
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="create-cultivation-disease-form"
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleCreateCultivationDisease)}
            >
              <CultivationDiseaseFormInputs />
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            form="create-cultivation-disease-form"
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

CreateCultivationDiseaseForm.displayName = 'CreateCultivationDiseaseForm'
