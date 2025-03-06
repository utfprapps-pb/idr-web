import { Button, Input } from '@/core/presentation/components/ui'

import { AnimalDataTable } from '../components/animal-data-table'
import { AnimalDeleteDialog } from '../components/animal-delete-dialog'
import { AnimalContext, AnimalProvider } from '../contexts/animal-context'
import { AnimalForm } from '../forms/animal-form'

export function AnimalsScreen() {
  return (
    <AnimalProvider>
      <AnimalContext.Consumer>
        {({
          selectedAnimal,
          isOpenDeleteAnimalContainer,
          isOpenNewAnimalForm,
          isOpenEditAnimalForm,
          filters,
          handleChangeFilters,
          openNewAnimalForm,
        }) => (
          <section className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="default"
                className="self-end"
                onClick={openNewAnimalForm}
              >
                Adicionar Animal
              </Button>

              <Input
                className="w-fit"
                value={filters.name}
                onChange={({ target }) => {
                  handleChangeFilters({ name: target.value })
                }}
                placeholder="Procurar animal"
              />
            </div>

            <AnimalDataTable />
            {selectedAnimal && isOpenDeleteAnimalContainer && (
              <AnimalDeleteDialog />
            )}

            {(isOpenNewAnimalForm || isOpenEditAnimalForm) && (
              <AnimalForm id={selectedAnimal?.id} />
            )}
          </section>
        )}
      </AnimalContext.Consumer>
    </AnimalProvider>
  )
}

AnimalsScreen.displayName = 'AnimalScreen'
