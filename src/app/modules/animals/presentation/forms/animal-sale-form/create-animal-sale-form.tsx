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

import { makeRemoteCreateAnimalSaleUseCase } from '../../../main/factories/use-cases/animal-sales-use-cases'
import { useAnimalSaleContext } from '../../hooks/animal-sale-context.hook'
import {
  animalSaleFormSchema,
  AnimalSaleFormSchema,
} from '../../validations/animal-sale-form-schema'

import { AnimalSaleFormInputs } from './animal-sale-form-inputs'
import { ANIMAL_SALE_INITIAL_FORM_DATA } from './animal-sale-initial-data'

export function CreateAnimalSaleForm() {
  const {
    propertyId,
    animalId,
    isOpenNewAnimalSaleForm,
    closeNewAnimalSaleForm,
  } = useAnimalSaleContext()

  const createAnimalSaleUseCase = makeRemoteCreateAnimalSaleUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<AnimalSaleFormSchema>({
    defaultValues: ANIMAL_SALE_INITIAL_FORM_DATA,
    resolver: zodResolver(animalSaleFormSchema),
  })

  const { mutateAsync: mutateHandleCreateAnimalSale } = useMutation({
    mutationFn: createAnimalSaleUseCase.execute,
  })

  const handleCreateAnimalSale = useCallback(
    async (data: AnimalSaleFormSchema) => {
      try {
        await mutateHandleCreateAnimalSale({
          propertyId,
          animalId,
          animalSale: data,
        })

        queryClient.invalidateQueries({
          queryKey: ['animal-sales'],
          exact: false,
        })

        toast.success('Venda de animal foi cadastrado com sucesso')

        form.reset(ANIMAL_SALE_INITIAL_FORM_DATA)

        closeNewAnimalSaleForm()
      } catch {
        toast.error('Erro ao cadastrar venda de animal')
      }
    },
    [
      animalId,
      closeNewAnimalSaleForm,
      form,
      mutateHandleCreateAnimalSale,
      propertyId,
      queryClient,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenNewAnimalSaleForm}
      onOpenChange={closeNewAnimalSaleForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Nova Venda</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar uma nova venda
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="create-animal-sale-form"
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleCreateAnimalSale)}
            >
              <AnimalSaleFormInputs />
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            form="create-animal-sale-form"
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

CreateAnimalSaleForm.displayName = 'CreateAnimalSaleForm'
