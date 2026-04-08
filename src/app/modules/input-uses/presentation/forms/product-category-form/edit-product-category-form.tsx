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

import { makeRemoteUpdateProductCategoryUseCase } from '../../../main/factories/use-cases/product-categories-use-cases'
import { useProductCategoryContext } from '../../hooks/product-category-context.hook'
import { useProductCategoryQuery } from '../../hooks/queries/product-category-query.hook'
import {
  productCategoryFormSchema,
  type ProductCategoryFormSchema,
} from '../../validations/product-category-form-schema'

import { ProductCategoryFormInputs } from './product-category-form-inputs'
import { PRODUCT_CATEGORY_INITIAL_FORM_DATA } from './product-category-initial-form-data'

export function EditProductCategoryForm() {
  const {
    isOpenEditProductCategoryForm,
    closeEditProductCategoryForm,
    selectedProductCategory,
  } = useProductCategoryContext()

  const { isLoading, productCategory } = useProductCategoryQuery({
    id: selectedProductCategory!.id,
  })

  const updateProductCategoryUseCase = makeRemoteUpdateProductCategoryUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<ProductCategoryFormSchema>({
    defaultValues: PRODUCT_CATEGORY_INITIAL_FORM_DATA,
    ...(productCategory && {
      values: {
        ...productCategory,
      },
    }),
    resolver: zodResolver(productCategoryFormSchema),
  })

  const { mutateAsync: mutateHandleUpdateProductCategory } = useMutation({
    mutationFn: updateProductCategoryUseCase.execute,
  })

  const handleUpdateProductCategory = useCallback(
    async (data: ProductCategoryFormSchema) => {
      try {
        if (!selectedProductCategory?.id) {
          toast.error('Erro ao atualizar categoria de produto')
          return
        }

        await mutateHandleUpdateProductCategory({
          productCategory: {
            ...data,
            id: selectedProductCategory.id,
          },
        })

        queryClient.invalidateQueries({
          queryKey: ['product-categories'],
          exact: false,
        })

        toast.success('Categoria de produto foi editado com sucesso')
        form.reset(PRODUCT_CATEGORY_INITIAL_FORM_DATA)
        closeEditProductCategoryForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      closeEditProductCategoryForm,
      form,
      mutateHandleUpdateProductCategory,
      queryClient,
      selectedProductCategory,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenEditProductCategoryForm}
      onOpenChange={closeEditProductCategoryForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Editar Categoria de Produto</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar o categoria de produto
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="update-product-category-form"
              className="flex flex-col px-2 gap-4 mt-4"
              onSubmit={form.handleSubmit(handleUpdateProductCategory)}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <Loading size="lg" />
                </div>
              ) : (
                <ProductCategoryFormInputs />
              )}
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer className="mt-8">
          <Button
            type="submit"
            form="update-product-category-form"
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

EditProductCategoryForm.displayName = 'EditProductCategoryForm'
