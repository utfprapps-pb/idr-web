import { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { moneyMask } from '@/core/masker'
import {
  Button,
  Form,
  Loading,
  ScrollArea,
  Sheet,
} from '@/core/presentation/components/ui'
import { useHookForm } from '@/core/presentation/hooks'

import { makeRemoteUpdateForageUseCase } from '../../../main/factories/use-cases'
import { useForageContext } from '../../hooks/forage-context.hook'
import { useForageQuery } from '../../hooks/queries/forage-query.hook'
import {
  forageFormSchema,
  type ForageFormSchema,
} from '../../validations/forage-form-schema'

import { ForageFormInputs } from './forage-form-inputs'
import { FORAGE_INITIAL_FORM_DATA } from './forage-initial-form-data'

export function EditForageForm() {
  const {
    propertyId,
    isOpenEditForageForm,
    closeEditForageForm,
    selectedForage,
  } = useForageContext()

  const { isLoading, forage } = useForageQuery({
    id: selectedForage!.id,
    propertyId,
  })

  const updateForageUseCase = makeRemoteUpdateForageUseCase()

  const queryClient = useQueryClient()

const form = useHookForm<ForageFormSchema>({
  defaultValues: FORAGE_INITIAL_FORM_DATA,
  ...(forage && {
    values: {
      cultivation: forage.cultivation
        ? {
            label: forage.cultivation.label ?? String(forage.cultivation),
            value: forage.cultivation.value ?? forage.cultivation,
          }
        : null,
      area: String(forage.area ?? ''),
      averageCost: moneyMask(forage.averageCost),
      usefulLife: String(forage.usefulLife ?? ''),
      formation: forage.formation ? new Date(forage.formation) : new Date(),
      ownershipType: forage.ownershipType ?? 'OWNED_LAND',
      growthCycle: forage.growthCycle ?? 'PERENNIAL',
      observation: forage.observation ?? '',
    },
  }),
  resolver: zodResolver(forageFormSchema),
})

  const { mutateAsync: mutateHandleUpdateForage } = useMutation({
    mutationFn: updateForageUseCase.execute,
  })

  const handleUpdateForage = useCallback(
    async (data: ForageFormSchema) => {
      try {
        if (!selectedForage) {
          toast.error('Erro ao atualizar forrageira')
          return
        }

        await mutateHandleUpdateForage({
        forage: {
          ...data,
          id: selectedForage.id,
          // Adapte cultivation para o formato esperado pela API
          cultivation: data.cultivation
          ? { label: data.cultivation.label, value: data.cultivation.value }
          : { label: '', value: 0 },
        },
        propertyId,
      })

        queryClient.invalidateQueries({
          queryKey: ['forages'],
          exact: false,
        })

        toast.success('Forrageira foi editada com sucesso')
        form.reset(FORAGE_INITIAL_FORM_DATA)
        closeEditForageForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      closeEditForageForm,
      form,
      mutateHandleUpdateForage,
      propertyId,
      queryClient,
      selectedForage,
    ]
  )

  return (
    <Sheet.Root open={isOpenEditForageForm} onOpenChange={closeEditForageForm}>
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>{`Editar Forrageira de ${selectedForage?.cultivation}`}</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar a forrageira
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="update-forage-form"
              className="flex flex-col px-2 gap-4"
              onSubmit={form.handleSubmit(handleUpdateForage)}
            >
              {isLoading ? (
                <div className="flex justify-center h-full items-center">
                  <Loading size="lg" />
                </div>
              ) : (
                <ForageFormInputs />
              )}
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            type="submit"
            form="update-forage-form"
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

EditForageForm.displayName = 'EditForageForm'
