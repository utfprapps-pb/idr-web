import { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

import { moneyMask, floatMask } from '@/core/masker'
import {
  Button,
  Form,
  Loading,
  ScrollArea,
  Sheet,
} from '@/core/presentation/components/ui'
import { useHookForm } from '@/core/presentation/hooks'

import { makeRemoteUpdateAnimalPurchaseUseCase } from '../../../main/factories/use-cases/animal-purchases-use-cases'
import { useAnimalPurchaseContext } from '../../hooks/animal-purchase-context.hook'
import { useAnimalPurchaseQuery } from '../../hooks/queries/animal-purchase-query.hook'
import {
  animalPurchaseFormSchema,
  type AnimalPurchaseFormSchema,
} from '../../validations/animal-purchase-form-schema'

import { AnimalPurchaseFormInputs } from './animal-purchase-form-inputs'
import { ANIMAL_PURCHASE_INITIAL_FORM_DATA } from './animal-purchase-initial-form-data'

export function EditAnimalPurchaseForm() {
  const {
    propertyId,
    animalId,
    isOpenEditAnimalPurchaseForm,
    closeEditAnimalPurchaseForm,
    selectedAnimalPurchase,
  } = useAnimalPurchaseContext()

  const { isLoading, animalPurchase } = useAnimalPurchaseQuery({
    id: selectedAnimalPurchase!.id,
    propertyId,
    animalId,
  })

  const updateAnimalPurchaseUseCase = makeRemoteUpdateAnimalPurchaseUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<AnimalPurchaseFormSchema>({
    defaultValues: ANIMAL_PURCHASE_INITIAL_FORM_DATA,
    ...(animalPurchase && {
      values: {
        ...animalPurchase,
        price: moneyMask(animalPurchase.price),
        weight: floatMask(animalPurchase.weight, 'kg'),
      },
    }),
    resolver: zodResolver(animalPurchaseFormSchema),
  })

  const { mutateAsync: mutateHandleUpdateAnimalPurchase } = useMutation({
    mutationFn: updateAnimalPurchaseUseCase.execute,
  })

  const handleUpdateAnimalPurchase = useCallback(
    async (data: AnimalPurchaseFormSchema) => {
      try {
        if (!selectedAnimalPurchase) {
          toast.error('Erro ao atualizar compra do animal')
          return
        }

        await mutateHandleUpdateAnimalPurchase({
          animalPurchase: {
            ...data,
            id: selectedAnimalPurchase.id,
          },
          animalId,
          propertyId,
        })
        queryClient.invalidateQueries({
          queryKey: ['animal-purchases'],
          exact: false,
        })
        toast.success('Compra de animal foi editada com sucesso')
        form.reset(ANIMAL_PURCHASE_INITIAL_FORM_DATA)
        closeEditAnimalPurchaseForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      animalId,
      closeEditAnimalPurchaseForm,
      form,
      mutateHandleUpdateAnimalPurchase,
      propertyId,
      queryClient,
      selectedAnimalPurchase,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenEditAnimalPurchaseForm}
      onOpenChange={closeEditAnimalPurchaseForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>
            Editar Compra do animal do dia{' '}
            {selectedAnimalPurchase?.date
              ? format(selectedAnimalPurchase.date, 'dd/MM/yyyy')
              : '-'}
          </Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar a compra do animal
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="update-animal-purchase-form"
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleUpdateAnimalPurchase)}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <Loading size="lg" />
                </div>
              ) : (
                <AnimalPurchaseFormInputs />
              )}
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            type="submit"
            form="update-animal-purchase-form"
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

EditAnimalPurchaseForm.displayName = 'EditAnimalPurchaseForm'
