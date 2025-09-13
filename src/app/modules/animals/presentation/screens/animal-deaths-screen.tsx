import { Button, DatePicker } from '@/core/presentation/components/ui'

import { AnimalDeathDataTable } from '../components/animal-death-data-table'
import { AnimalDeathDeleteDialog } from '../components/animal-death-delete-dialog'
import {
  AnimalDeathContext,
  AnimalDeathProvider,
} from '../contexts/animal-death-context'
import { AnimalDeathForm } from '../forms/animal-death-form'

type AnimalDeathsScreenProps = {
  readonly animalId: number
}

export function AnimalDeathsScreen({ animalId }: AnimalDeathsScreenProps) {
  return (
    <AnimalDeathProvider animalId={animalId}>
      <AnimalDeathContext.Consumer>
        {({
          filters,
          handleChangeFilters,
          selectedAnimalDeath,
          isOpenDeleteAnimalDeathContainer,
          isOpenNewAnimalDeathForm,
          isOpenEditAnimalDeathForm,
          openNewAnimalDeathForm,
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
                label="Filtrar por data do óbito"
              />

              <Button
                type="button"
                variant="default"
                onClick={openNewAnimalDeathForm}
              >
                Adicionar Óbito do Animal
              </Button>
            </div>

            <AnimalDeathDataTable />
            {selectedAnimalDeath && isOpenDeleteAnimalDeathContainer && (
              <AnimalDeathDeleteDialog />
            )}

            {(isOpenNewAnimalDeathForm || isOpenEditAnimalDeathForm) && (
              <AnimalDeathForm id={selectedAnimalDeath?.id} />
            )}
          </section>
        )}
      </AnimalDeathContext.Consumer>
    </AnimalDeathProvider>
  )
}

AnimalDeathsScreen.displayName = 'AnimalDeathsScreen'
