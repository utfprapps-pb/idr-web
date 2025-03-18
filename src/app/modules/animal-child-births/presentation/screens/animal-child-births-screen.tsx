import { Button, Input } from '@/core/presentation/components/ui'

import { AnimalChildBirthDataTable } from '../components/animal-child-birth-data-table'
import { AnimalChildBirthDeleteDialog } from '../components/animal-child-birth-delete-dialog'
import {
  AnimalChildBirthContext,
  AnimalChildBirthProvider,
} from '../contexts/animal-child-birth-context'
import { AnimalChildBirthForm } from '../form/animal-child-birth-form'

export function AnimalChildBirthsScreen() {
  return (
    <AnimalChildBirthProvider>
      <AnimalChildBirthContext.Consumer>
        {({
          filters,
          handleChangeFilters,
          selectedAnimalChildBirth,
          isOpenDeleteAnimalChildBirthContainer,
          isOpenNewAnimalChildBirthForm,
          isOpenEditAnimalChildBirthForm,
          openNewAnimalChildBirthForm,
        }) => (
          <section className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="default"
                className="self-end"
                onClick={openNewAnimalChildBirthForm}
              >
                Adicionar Parto do Animal
              </Button>

              <Input
                className="w-fit"
                value={filters.breed}
                onChange={({ target }) => {
                  handleChangeFilters({ breed: target.value })
                }}
                placeholder="Procurar animal por raça"
              />
            </div>

            <AnimalChildBirthDataTable />
            {selectedAnimalChildBirth &&
              isOpenDeleteAnimalChildBirthContainer && (
                <AnimalChildBirthDeleteDialog />
              )}

            {(isOpenNewAnimalChildBirthForm ||
              isOpenEditAnimalChildBirthForm) && (
              <AnimalChildBirthForm id={selectedAnimalChildBirth?.id} />
            )}
          </section>
        )}
      </AnimalChildBirthContext.Consumer>
    </AnimalChildBirthProvider>
  )
}
