import { Button, DatePicker } from '@/core/presentation/components/ui'

import { AnimalHeiferCalfStageDataTable } from '../components/animal-heifer-calf-stage-data-table'
import { AnimalHeiferCalfStageDeleteDialog } from '../components/animal-heifer-calf-stage-delete-dialog'
import {
  AnimalHeiferCalfStageContext,
  AnimalHeiferCalfStageProvider,
} from '../contexts/animal-heifer-calf-stage-context'
import { AnimalHeiferCalfStageForm } from '../forms/animal-heifer-calf-stage-form'

type AnimalHeiferCalfStagesScreenProps = {
  animalId: string
}

export function AnimalHeiferCalfStagesScreen({
  animalId,
}: AnimalHeiferCalfStagesScreenProps) {
  return (
    <AnimalHeiferCalfStageProvider animalId={animalId}>
      <AnimalHeiferCalfStageContext.Consumer>
        {({
          filters,
          handleChangeFilters,
          selectedAnimalHeiferCalfStage,
          isOpenDeleteAnimalHeiferCalfStageContainer,
          isOpenNewAnimalHeiferCalfStageForm,
          isOpenEditAnimalHeiferCalfStageForm,
          openNewAnimalHeiferCalfStageForm,
        }) => (
          <section className="flex flex-col gap-4 w-full">
            <div className="flex justify-between gap-2">
              <DatePicker
                className="w-fit"
                label="Filtrar por data de pesagem"
                date={filters.weighingDate}
                onSelect={(date) =>
                  handleChangeFilters({
                    ...filters,
                    weighingDate: date,
                  })
                }
              />

              <Button
                type="button"
                variant="default"
                onClick={openNewAnimalHeiferCalfStageForm}
              >
                Adicionar Parto do Animal
              </Button>
            </div>

            <AnimalHeiferCalfStageDataTable />
            {selectedAnimalHeiferCalfStage &&
              isOpenDeleteAnimalHeiferCalfStageContainer && (
                <AnimalHeiferCalfStageDeleteDialog />
              )}

            {(isOpenNewAnimalHeiferCalfStageForm ||
              isOpenEditAnimalHeiferCalfStageForm) && (
              <AnimalHeiferCalfStageForm
                id={selectedAnimalHeiferCalfStage?.id}
              />
            )}
          </section>
        )}
      </AnimalHeiferCalfStageContext.Consumer>
    </AnimalHeiferCalfStageProvider>
  )
}
