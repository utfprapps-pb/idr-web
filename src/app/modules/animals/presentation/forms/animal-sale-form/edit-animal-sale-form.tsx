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

import { makeRemoteUpdateAnimalSaleUseCase } from '../../../main/factories/use-cases/animal-sales-use-cases'
import { useAnimalSaleContext } from '../../hooks/animal-sale-context.hook'
import { useAnimalSaleQuery } from '../../hooks/queries/animal-sale-query.hook'
import {
  animalSaleFormSchema,
  type AnimalSaleFormSchema,
} from '../../validations/animal-sale-form-schema'

import { AnimalSaleFormInputs } from './animal-sale-form-inputs'
import { ANIMAL_SALE_INITIAL_FORM_DATA } from './animal-sale-initial-form-data'

export function EditAnimalSaleForm() {
  const {
    propertyId,
    animalId,
    isOpenEditAnimalSaleForm,
    closeEditAnimalSaleForm,
    selectedAnimalSale,
  } = useAnimalSaleContext()

  const { isLoading, animalSale } = useAnimalSaleQuery({
    id: selectedAnimalSale!.id,
    propertyId,
    animalId,
  })

  const updateAnimalSaleUseCase = makeRemoteUpdateAnimalSaleUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<AnimalSaleFormSchema>({
    defaultValues: ANIMAL_SALE_INITIAL_FORM_DATA,
    ...(animalSale && {
      values: {
        ...animalSale,
        price: moneyMask(animalSale.price),
        weight: floatMask(animalSale.weight, 'kg'),
      },
    }),
    resolver: zodResolver(animalSaleFormSchema),
  })

  const { mutateAsync: mutateHandleUpdateAnimalSale } = useMutation({
    mutationFn: updateAnimalSaleUseCase.execute,
  })

  const handleUpdateAnimalSale = useCallback(
    async (data: AnimalSaleFormSchema) => {
      try {
        if (!selectedAnimalSale) {
          toast.error('Erro ao atualizar venda do animal')
          return
        }

        await mutateHandleUpdateAnimalSale({
          animalSale: {
            ...data,
            id: selectedAnimalSale.id,
          },
          animalId,
          propertyId,
        })
        queryClient.invalidateQueries({
          queryKey: ['animal-sales', propertyId],
          exact: false,
        })
        toast.success('Venda de animal foi editada com sucesso')
        form.reset(ANIMAL_SALE_INITIAL_FORM_DATA)
        closeEditAnimalSaleForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      animalId,
      closeEditAnimalSaleForm,
      form,
      mutateHandleUpdateAnimalSale,
      propertyId,
      queryClient,
      selectedAnimalSale,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenEditAnimalSaleForm}
      onOpenChange={closeEditAnimalSaleForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>
            Editar Venda do animal do dia{' '}
            {selectedAnimalSale?.date
              ? format(selectedAnimalSale.date, 'dd/MM/yyyy')
              : '-'}
          </Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar a venda do animal
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="update-animal-sale-form"
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleUpdateAnimalSale)}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <Loading size="lg" />
                </div>
              ) : (
                <AnimalSaleFormInputs />
              )}
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            type="submit"
            form="update-animal-sale-form"
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

EditAnimalSaleForm.displayName = 'EditAnimalSaleForm'
