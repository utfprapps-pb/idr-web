import { Button, Input } from '@/core/presentation/components/ui'

import { AnimalChildBirthDataTable } from '../components/animal-childbirth-data-table'
import { AnimalChildBirthDeleteDialog } from '../components/animal-childbirth-delete-dialog'
import {
  AnimalChildBirthContext,
  AnimalChildBirthProvider,
} from '../contexts/animal-childbirth-context'
import { AnimalChildBirthForm } from '../forms/animal-childbirth-form'

type AnimalChildBirthsScreenProps = {
  animalId: string
}

export function AnimalChildBirthsScreen({
  animalId,
}: AnimalChildBirthsScreenProps) {
  return (
    <AnimalChildBirthProvider animalId={animalId}>
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
            <div className="flex justify-between gap-2">
              <Input
                className="w-fit"
                value={filters.breed}
                onChange={({ target }) => {
                  handleChangeFilters({ breed: target.value })
                }}
                placeholder="Procurar animal por raça"
              />

              <Button
                type="button"
                variant="default"
                onClick={openNewAnimalChildBirthForm}
              >
                Adicionar Parto do Animal
              </Button>
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
