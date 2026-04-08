import { Button, Input } from '@/core/presentation/components/ui'

import { InputUseProductCategoryDataTable } from '../components/input-use-product-category-data-table'
import { InputUseProductCategoryDeleteDialog } from '../components/input-use-product-category-delete-dialog'
import {
  InputUseProductCategoryContext,
  InputUseProductCategoryProvider,
} from '../contexts/input-use-product-category-context'
import { InputUseProductCategoryForm } from '../forms/input-use-product-category-form'

export function InputUseProductCategoriesScreen() {
  return (
    <InputUseProductCategoryProvider>
      <InputUseProductCategoryContext.Consumer>
        {({
          selectedInputUseProductCategory,
          isOpenDeleteInputUseProductCategoryContainer,
          isOpenNewInputUseProductCategoryForm,
          isOpenEditInputUseProductCategoryForm,
          filters,
          handleChangeFilters,
          openNewInputUseProductCategoryForm,
        }) => (
          <section className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="default"
                className="self-end"
                onClick={openNewInputUseProductCategoryForm}
              >
                Adicionar Categoria de Produto
              </Button>

              <Input
                className="w-fit"
                value={filters.name?.value ?? ''}
                onChange={({ target }) => {
                  handleChangeFilters({
                    name: { value: target.value, type: 'LIKE' },
                  })
                }}
                placeholder="Procurar categoria por nome"
              />
            </div>

            <InputUseProductCategoryDataTable />

            {selectedInputUseProductCategory &&
              isOpenDeleteInputUseProductCategoryContainer && (
                <InputUseProductCategoryDeleteDialog />
              )}

            {(isOpenNewInputUseProductCategoryForm ||
              isOpenEditInputUseProductCategoryForm) && (
              <InputUseProductCategoryForm
                id={selectedInputUseProductCategory?.id}
              />
            )}
          </section>
        )}
      </InputUseProductCategoryContext.Consumer>
    </InputUseProductCategoryProvider>
  )
}

InputUseProductCategoriesScreen.displayName = 'InputUseProductCategoriesScreen'
