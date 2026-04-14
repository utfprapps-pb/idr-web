import { Button, Input } from '@/core/presentation/components/ui'

import { InputUseProductDataTable } from '../components/input-use-product-data-table'
import { InputUseProductDeleteDialog } from '../components/input-use-product-delete-dialog'
import {
  InputUseProductContext,
  InputUseProductProvider,
} from '../contexts/input-use-product-context'
import { InputUseProductForm } from '../forms/input-use-product-form'

export function InputUseProductsScreen() {
  return (
    <InputUseProductProvider>
      <InputUseProductContext.Consumer>
        {({
          filters,
          handleChangeFilters,
          selectedInputUseProduct,
          isOpenDeleteInputUseProductContainer,
          isOpenNewInputUseProductForm,
          isOpenEditInputUseProductForm,
          openNewInputUseProductForm,
        }) => (
          <section className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="default"
                className="self-end"
                onClick={openNewInputUseProductForm}
              >
                Adicionar Produto
              </Button>

              <Input
                className="w-fit"
                value={filters.name?.value}
                onChange={({ target }) => {
                  handleChangeFilters({
                    name: {
                      value: target.value,
                      type: 'LIKE',
                    },
                  })
                }}
                placeholder="Procurar produto por nome"
              />
            </div>

            <InputUseProductDataTable />
            {selectedInputUseProduct &&
              isOpenDeleteInputUseProductContainer && (
                <InputUseProductDeleteDialog />
              )}

            {(isOpenNewInputUseProductForm ||
              isOpenEditInputUseProductForm) && (
              <InputUseProductForm id={selectedInputUseProduct?.id} />
            )}
          </section>
        )}
      </InputUseProductContext.Consumer>
    </InputUseProductProvider>
  )
}

InputUseProductsScreen.displayName = 'InputUseProductsScreen'
