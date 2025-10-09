import { Button, DatePicker } from '@/core/presentation/components/ui'

import { AnimalInseminationDataTable } from '../components/animal-insemination-data-table'
import { AnimalInseminationDeleteDialog } from '../components/animal-insemination-delete-dialog'
import {
  AnimalInseminationContext,
  AnimalInseminationProvider,
} from '../contexts/animal-insemination-context'
import { AnimalInseminationForm } from '../forms/animal-insemination-form'

type AnimalInseminationsScreenProps = {
  readonly animalId: number
}

export function AnimalInseminationsScreen({
  animalId,
}: AnimalInseminationsScreenProps) {
  return (
    <AnimalInseminationProvider animalId={animalId}>
      <AnimalInseminationContext.Consumer>
        {({
          filters,
          handleChangeFilters,
          selectedAnimalInsemination,
          isOpenDeleteAnimalInseminationContainer,
          isOpenNewAnimalInseminationForm,
          isOpenEditAnimalInseminationForm,
          openNewAnimalInseminationForm,
        }) => (
          <section className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="default"
                className="self-end"
                onClick={openNewAnimalInseminationForm}
              >
                Adicionar Inseminação Artificial
              </Button>

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
                label="Filtrar por data de inseminação artificial"
              />
            </div>

            <AnimalInseminationDataTable />
            {selectedAnimalInsemination &&
              isOpenDeleteAnimalInseminationContainer && (
                <AnimalInseminationDeleteDialog />
              )}

            {(isOpenNewAnimalInseminationForm ||
              isOpenEditAnimalInseminationForm) && (
              <AnimalInseminationForm id={selectedAnimalInsemination?.id} />
            )}
          </section>
        )}
      </AnimalInseminationContext.Consumer>
    </AnimalInseminationProvider>
  )
}

AnimalInseminationsScreen.displayName = 'AnimalInseminationsScreen'
