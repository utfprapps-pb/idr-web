import { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { onlyNumbersMask, percentMask } from '@/core/masker'
import {
  Button,
  Form,
  Loading,
  ScrollArea,
  Sheet,
} from '@/core/presentation/components/ui'
import { useHookForm } from '@/core/presentation/hooks'

import { makeRemoteUpdateGeneralCultivationUseCase } from '../../../main/factories/use-cases/general-cultivations-use-cases'
import { useGeneralCultivationContext } from '../../hooks/general-cultivation-context.hook'
import { useGeneralCultivationQuery } from '../../hooks/queries/general-cultivation-query.hook'
import {
  generalCultivationFormSchema,
  type GeneralCultivationFormSchema,
} from '../../validations/general-cultivation-form-schema'

import { GeneralCultivationFormInputs } from './general-cultivation-form-inputs'
import { GENERAL_CULTIVATION_INITIAL_FORM_DATA } from './general-cultivation-initial-form-data'

export function EditGeneralCultivationForm() {
  const {
    isOpenEditGeneralCultivationForm,
    closeEditGeneralCultivationForm,
    selectedGeneralCultivation,
  } = useGeneralCultivationContext()

  const { isLoading, generalCultivation } = useGeneralCultivationQuery({
    id: selectedGeneralCultivation!.id,
  })

  const updateGeneralCultivationUseCase =
    makeRemoteUpdateGeneralCultivationUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<GeneralCultivationFormSchema>({
    defaultValues: GENERAL_CULTIVATION_INITIAL_FORM_DATA,
    ...(generalCultivation && {
      values: {
        ...generalCultivation,
        calcium: percentMask(String(generalCultivation.calcium)),
        phosphorus: percentMask(String(generalCultivation.phosphorus)),
        crudeProtein: percentMask(String(generalCultivation.crudeProtein)),
        dryMatter: percentMask(String(generalCultivation.dryMatter)),
        etherExtract: percentMask(String(generalCultivation.etherExtract)),
        nonFibrousCarbohydrates: percentMask(
          String(generalCultivation.nonFibrousCarbohydrates)
        ),
        rumenDegradableProtein: percentMask(
          String(generalCultivation.rumenDegradableProtein)
        ),
        totalDigestibleNutrients: percentMask(
          String(generalCultivation.totalDigestibleNutrients)
        ),
      },
    }),
    resolver: zodResolver(generalCultivationFormSchema),
  })

  const { mutateAsync: mutateHandleUpdateGeneralCultivation } = useMutation({
    mutationFn: updateGeneralCultivationUseCase.execute,
  })

  const handleUpdateGeneralCultivation = useCallback(
    async (data: GeneralCultivationFormSchema) => {
      try {
        if (!selectedGeneralCultivation) {
          toast.error('Erro ao atualizar Cultivo Geral')
          return
        }

        const parsePercent = (value: string) => {
          const parsed = Number(onlyNumbersMask(value))
          return Number.isNaN(parsed) ? 0 : parsed
        }

        await mutateHandleUpdateGeneralCultivation({
          generalCultivation: {
            name: data.name,
            type: data.type,
            calcium: parsePercent(data.calcium),
            phosphorus: parsePercent(data.phosphorus),
            crudeProtein: parsePercent(data.crudeProtein),
            dryMatter: parsePercent(data.dryMatter),
            etherExtract: parsePercent(data.etherExtract),
            nonFibrousCarbohydrates: parsePercent(data.nonFibrousCarbohydrates),
            rumenDegradableProtein: parsePercent(data.rumenDegradableProtein),
            totalDigestibleNutrients: parsePercent(
              data.totalDigestibleNutrients
            ),
            id: selectedGeneralCultivation.id,
          },
        })

        queryClient.invalidateQueries({
          queryKey: ['general-cultivations'],
          exact: false,
        })

        toast.success('Cultivo Geral foi editado com sucesso')
        form.reset(GENERAL_CULTIVATION_INITIAL_FORM_DATA)
        closeEditGeneralCultivationForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      closeEditGeneralCultivationForm,
      form,
      mutateHandleUpdateGeneralCultivation,
      queryClient,
      selectedGeneralCultivation,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenEditGeneralCultivationForm}
      onOpenChange={closeEditGeneralCultivationForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>{`Editar Cultivo Geral ${selectedGeneralCultivation?.name}`}</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar o Cultivo Geral.
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="update-general-cultivation-form"
              className="flex flex-col px-2 gap-4"
              onSubmit={form.handleSubmit(handleUpdateGeneralCultivation)}
            >
              {isLoading ? (
                <div className="flex justify-center h-full items-center">
                  <Loading size="lg" />
                </div>
              ) : (
                <GeneralCultivationFormInputs />
              )}
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            type="submit"
            form="update-general-cultivation-form"
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

EditGeneralCultivationForm.displayName = 'EditGeneralCultivationForm'
