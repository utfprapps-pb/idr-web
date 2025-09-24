import { Button, DatePicker } from '@/core/presentation/components/ui'

import { AnimalPurchaseDataTable } from '../components/animal-purchase-data-table'
import { AnimalPurchaseDeleteDialog } from '../components/animal-purchase-delete-dialog'
import {
  AnimalPurchaseContext,
  AnimalPurchaseProvider,
} from '../contexts/animal-purchase-context'
import { AnimalPurchaseForm } from '../forms/animal-purchase-form'

type AnimalPurchasesScreenProps = {
  readonly animalId: number
}

export function AnimalPurchasesScreen({
  animalId,
}: AnimalPurchasesScreenProps) {
  return (
    <AnimalPurchaseProvider animalId={animalId}>
      <AnimalPurchaseContext.Consumer>
        {({
          filters,
          handleChangeFilters,
          selectedAnimalPurchase,
          isOpenDeleteAnimalPurchaseContainer,
          isOpenNewAnimalPurchaseForm,
          isOpenEditAnimalPurchaseForm,
          openNewAnimalPurchaseForm,
        }) => (
          <section className="flex flex-col gap-4 w-full">
            <div className="flex justify-between gap-2">
              <DatePicker
                className="w-fit"
                date={filters.date?.value}
                onSelect={(date) => {
                  if (!date) return
                  handleChangeFilters({
                    date: {
                      value: date,
                      type: 'EQUALS',
                    },
                  })
                }}
                label="Filtrar por data de compra"
              />

              <Button
                type="button"
                variant="default"
                onClick={openNewAnimalPurchaseForm}
              >
                Adicionar Compra do Animal
              </Button>
            </div>

            <AnimalPurchaseDataTable />
            {selectedAnimalPurchase && isOpenDeleteAnimalPurchaseContainer && (
              <AnimalPurchaseDeleteDialog />
            )}

            {(isOpenNewAnimalPurchaseForm || isOpenEditAnimalPurchaseForm) && (
              <AnimalPurchaseForm id={selectedAnimalPurchase?.id} />
            )}
          </section>
        )}
      </AnimalPurchaseContext.Consumer>
    </AnimalPurchaseProvider>
  )
}

AnimalPurchasesScreen.displayName = 'AnimalPurchasesScreen'
