import { Button, DatePicker } from '@/core/presentation/components/ui'

import { AnimalMedicationDataTable } from '../components/animal-medication-data-table'
import { AnimalMedicationDeleteDialog } from '../components/animal-medication-delete-dialog'
import {
  AnimalMedicationContext,
  AnimalMedicationProvider,
} from '../contexts/animal-medication-context'
import { AnimalMedicationForm } from '../forms/animal-medication-form'

type AnimalMedicationsScreenProps = {
  readonly animalId: number
}

export function AnimalMedicationsScreen({
  animalId,
}: AnimalMedicationsScreenProps) {
  return (
    <AnimalMedicationProvider animalId={animalId}>
      <AnimalMedicationContext.Consumer>
        {({
          filters,
          handleChangeFilters,
          selectedAnimalMedication,
          isOpenDeleteAnimalMedicationContainer,
          isOpenNewAnimalMedicationForm,
          isOpenEditAnimalMedicationForm,
          openNewAnimalMedicationForm,
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
                label="Filtrar por data da medicação"
              />

              <Button
                type="button"
                variant="default"
                onClick={openNewAnimalMedicationForm}
              >
                Adicionar Parto do Animal
              </Button>
            </div>

            <AnimalMedicationDataTable />
            {selectedAnimalMedication &&
              isOpenDeleteAnimalMedicationContainer && (
                <AnimalMedicationDeleteDialog />
              )}

            {(isOpenNewAnimalMedicationForm ||
              isOpenEditAnimalMedicationForm) && (
              <AnimalMedicationForm id={selectedAnimalMedication?.id} />
            )}
          </section>
        )}
      </AnimalMedicationContext.Consumer>
    </AnimalMedicationProvider>
  )
}

AnimalMedicationsScreen.displayName = 'AnimalMedicationsScreen'
