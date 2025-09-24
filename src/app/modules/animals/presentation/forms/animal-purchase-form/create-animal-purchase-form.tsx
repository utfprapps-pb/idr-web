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

import { makeRemoteCreateAnimalPurchaseUseCase } from '../../../main/factories/use-cases/animal-purchases-use-cases'
import { useAnimalPurchaseContext } from '../../hooks/animal-purchase-context.hook'
import {
  animalPurchaseFormSchema,
  AnimalPurchaseFormSchema,
} from '../../validations/animal-purchase-form-schema'

import { AnimalPurchaseFormInputs } from './animal-purchase-form-inputs'
import { ANIMAL_PURCHASE_INITIAL_FORM_DATA } from './animal-purchase-initial-data'

export function CreateAnimalPurchaseForm() {
  const {
    propertyId,
    animalId,
    isOpenNewAnimalPurchaseForm,
    closeNewAnimalPurchaseForm,
  } = useAnimalPurchaseContext()

  const createAnimalPurchaseUseCase = makeRemoteCreateAnimalPurchaseUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<AnimalPurchaseFormSchema>({
    defaultValues: ANIMAL_PURCHASE_INITIAL_FORM_DATA,
    resolver: zodResolver(animalPurchaseFormSchema),
  })

  const { mutateAsync: mutateHandleCreateAnimalPurchase } = useMutation({
    mutationFn: createAnimalPurchaseUseCase.execute,
  })

  const handleCreateAnimalPurchase = useCallback(
    async (data: AnimalPurchaseFormSchema) => {
      try {
        await mutateHandleCreateAnimalPurchase({
          propertyId,
          animalId,
          animalPurchase: data,
        })

        queryClient.invalidateQueries({
          queryKey: ['animal-purchases'],
          exact: false,
        })

        toast.success('Compra de animal foi cadastrado com sucesso')

        form.reset(ANIMAL_PURCHASE_INITIAL_FORM_DATA)

        closeNewAnimalPurchaseForm()
      } catch {
        toast.error('Erro ao cadastrar compra de animal')
      }
    },
    [
      animalId,
      closeNewAnimalPurchaseForm,
      form,
      mutateHandleCreateAnimalPurchase,
      propertyId,
      queryClient,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenNewAnimalPurchaseForm}
      onOpenChange={closeNewAnimalPurchaseForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Nova Compra</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar uma nova compra
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="create-animal-purchase-form"
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleCreateAnimalPurchase)}
            >
              <AnimalPurchaseFormInputs />
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            form="create-animal-purchase-form"
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

CreateAnimalPurchaseForm.displayName = 'CreateAnimalPurchaseForm'
